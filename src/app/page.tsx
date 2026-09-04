import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/marketing/cta-band";
import { Faq } from "@/components/blocks/marketing/faq";
import { Hero } from "@/components/blocks/marketing/hero";
import { LedgerFrame, LedgerSection } from "@/components/blocks/marketing/ledger";
import { LogoStrip } from "@/components/blocks/marketing/logo-strip";
import { ManifestStrip } from "@/components/blocks/marketing/manifest-strip";
import { Pricing } from "@/components/blocks/marketing/pricing";
import { RecordCustoms } from "@/components/blocks/marketing/record-customs";
import { RecordDemurrage } from "@/components/blocks/marketing/record-demurrage";
import { RecordDocuments } from "@/components/blocks/marketing/record-documents";
import { RecordTracking } from "@/components/blocks/marketing/record-tracking";
import { SiteFooter } from "@/components/blocks/marketing/site-footer";
import { SiteNav } from "@/components/blocks/marketing/site-nav";

export const metadata: Metadata = {
  title: "Ballast · Every container, accounted for",
  description:
    "Freight operations for small importers: live container tracking, self-filing paperwork, a demurrage clock, and duty estimated at booking.",
  openGraph: {
    title: "Ballast · Every container, accounted for",
    description:
      "Freight operations for small importers. Bookings, documents, customs, and the demurrage clock in one ledger.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 flex-col">
        <LedgerFrame>
          <LedgerSection framed={false} className="pt-16 md:pt-24">
            <Hero />
          </LedgerSection>
          <ManifestStrip />
          <LedgerSection className="py-10 md:py-12">
            <LogoStrip />
          </LedgerSection>
          <LedgerSection id="tracking" index="01" code="Tracking">
            <RecordTracking />
          </LedgerSection>
          <LedgerSection index="02" code="Documents">
            <RecordDocuments />
          </LedgerSection>
          <LedgerSection index="03" code="Demurrage">
            <RecordDemurrage />
          </LedgerSection>
          <LedgerSection index="04" code="Customs">
            <RecordCustoms />
          </LedgerSection>
          <LedgerSection id="rates" index="05" code="Rates">
            <Pricing />
          </LedgerSection>
          <LedgerSection id="questions" index="06" code="Questions">
            <Faq />
          </LedgerSection>
          <LedgerSection className="p-0 md:p-0">
            <CtaBand />
          </LedgerSection>
        </LedgerFrame>
      </main>
      <SiteFooter />
    </>
  );
}
