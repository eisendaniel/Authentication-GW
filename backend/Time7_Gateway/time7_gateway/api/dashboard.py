from fastapi import APIRouter, Request, Query
from time7_gateway.models.schemas import ScanResult

# Add search interface
from time7_gateway.clients.supabase_client import get_supabase


router = APIRouter()


@router.get("/active-tags", response_model=list[ScanResult])
def active_tags(request: Request):
    active_tags = request.app.state.active_tags
    cache = request.app.state.tag_info_cache

    results: list[ScanResult] = []

    for t in active_tags.get_active():
        cached = cache.get(t.tag_id)
        if cached is None:
            continue

        auth, info = cached
        results.append(
            ScanResult(
                id=t.tag_id,
                date=t.last_seen,
                auth=auth,
                info=info,
            )
        )

    return results

# Add search interface for product_info table (by tid or epc)
@router.get("/product-info/search")
def search_product_info(q: str = Query(..., min_length=1)):
    """
    ONLY query product_info table by tid or epc (exact match).
    Return: {found: bool, item: row|None}
    """
    q = q.strip()
    sb = get_supabase()

    # 1) tid match
    r = sb.table("product_info").select("*").eq("tid", q).limit(1).execute()
    rows = r.data or []
    if rows:
        return {"found": True, "item": rows[0]}

    # 2) epc match
    r = sb.table("product_info").select("*").eq("epc", q).limit(1).execute()
    rows = r.data or []
    if rows:
        return {"found": True, "item": rows[0]}

    return {"found": False, "item": None}