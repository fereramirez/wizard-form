import {Suspense} from "react";

import {FunnelCard} from "@/components/funnel/funnel-card";
import {PageWrapper} from "@/components/wrappers/page-wrapper";

export default async function HomePage() {
  return (
    <PageWrapper>
      <Suspense>
        <FunnelCard />
      </Suspense>
    </PageWrapper>
  );
}
