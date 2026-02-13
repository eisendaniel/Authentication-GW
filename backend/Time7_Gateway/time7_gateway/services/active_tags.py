from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
from typing import Dict, Iterable, List, Optional, Set


@dataclass
class ActiveTag:
    tag_id: str
    first_seen: datetime     
    last_seen: datetime  
    epc_hex: str
    message_hex: str
    response_hex: str



def _utc(dt: datetime) -> datetime:
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


class ActiveTags:
    def __init__(self, remove_grace_seconds: float) -> None:
        self._tags: Dict[str, ActiveTag] = {}
        self._grace = timedelta(seconds=float(remove_grace_seconds))

    #current detected scan
    def sync_seen(
        self,
        seen: Dict[str, Dict[str, str]],
        seen_at: Optional[datetime] = None
    ) -> Set[str]:
        now = _utc(seen_at) if seen_at else datetime.now(timezone.utc)
        new_ids: Set[str] = set()

        for tid, data in (seen or {}).items():
            tid = str(tid)
            epc_hex = data.get("epcHex")
            message_hex = data.get("message_hex")
            response_hex = data.get("response_hex")
     

            cur = self._tags.get(tid)
            if cur is None:
                self._tags[tid] = ActiveTag(tag_id=tid, first_seen=now, last_seen=now, epc_hex=epc_hex, message_hex=message_hex, response_hex=response_hex)
                new_ids.add(tid)
            else:
                cur.last_seen = now
                cur.epc_hex = epc_hex
                cur.message_hex = message_hex
                cur.response_hex = response_hex
 

        self.remove_inactive(now=now)
        return new_ids
    
    def remove_inactive(self, now: Optional[datetime] = None) -> int:

        now_utc = _utc(now) if now else datetime.now(timezone.utc)
        cutoff = now_utc - self._grace

        removed = 0
        for tid in list(self._tags.keys()):
            if self._tags[tid].last_seen < cutoff:
                del self._tags[tid]
                removed += 1
        return removed
    
    def get_active(self) -> List[ActiveTag]:
        self.remove_inactive()
        return sorted(self._tags.values(), key=lambda x: x.first_seen, reverse=True)

    def get_active_ids(self) -> List[str]:
        self.remove_inactive()
        return list(self._tags.keys())
    
    #for debugging
    def snapshot(self) -> dict:
        items = [
            {
                "id": t.tag_id,
                "first_seen": t.first_seen,
                "last_seen": t.last_seen,
                "epc_hex" : t.epc_hex,
                "message_hex": t.message_hex,
                "response_hex": t.response_hex,
            }
            for t in self.get_active()
        ]

        return {"count": len(items), "items": items}    