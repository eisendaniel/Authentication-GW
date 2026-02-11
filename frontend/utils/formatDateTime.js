export function formatDateTime(value) {
    if (!value) return "";
  
    let s = String(value).trim();
  

    const hasTimezone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(s);
    if (!hasTimezone) {
      s = s.replace(" ", "T"); 
      s += "Z";                
    }
  
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return "";
  

    return new Intl.DateTimeFormat("en-NZ", {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  }