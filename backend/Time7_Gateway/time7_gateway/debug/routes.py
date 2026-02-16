import asyncio
from fastapi import APIRouter, Request, HTTPException
from time7_gateway.clients.reader_client import run_reader_stream

router = APIRouter(prefix="/debug", tags=["debug"])


@router.get("/active-tags")
def active_tags_pre_ias(request: Request):
    """
    Returns what ActiveTags currently holds before sending to IAS
    """
    return request.app.state.active_tags.snapshot()

@router.get("/post-ias")
def post_ias_snapshot(request: Request):
    """
    TagInfoCache snapshot (POST-IAS) in the same fields dashboard/DB uses.
    """
    return request.app.state.tag_info_cache.snapshot()

@router.post("/reader/start")
async def start_reader(request: Request):
    if getattr(request.app.state, "reader_task", None):
        raise HTTPException(status_code=409, detail="reader_task already running")
    request.app.state.reader_task = asyncio.create_task(run_reader_stream(request.app))
    return {"ok": True}

@router.post("/reader/stop")
async def stop_reader(request: Request):
    task = getattr(request.app.state, "reader_task", None)
    if not task:
        raise HTTPException(status_code=404, detail="reader_task not running")
    task.cancel()
    request.app.state.reader_task = None
    return {"ok": True}