import {useEffect} from "react";
import {useSearchParams} from "next/navigation";

import {useFunnelStore} from "@/contexts/use-funnel-store";

export function useHiddenData() {
  const searchParams = useSearchParams();

  const affiliateId = searchParams.get("affiliate_id") || null;
  const utmSource = searchParams.get("utm_source") || null;

  const {setHiddenData, setFunnelData, optional, purple, blue, green} = useFunnelStore();

  useEffect(() => {
    setHiddenData({
      userAgent: navigator.userAgent,
      affiliateId,
      utmSource,
    });

    setFunnelData({
      purple: optional === "purple" ? purple : null,
      blue: optional === "blue" ? blue : null,
      green: optional === "green" ? green : null,
    });
  }, [setHiddenData, setFunnelData, optional, purple, blue, green, affiliateId, utmSource]);
}
