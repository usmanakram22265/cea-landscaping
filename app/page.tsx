import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { ServicesIndex } from "@/components/services-index";
import { WhyProof } from "@/components/why-proof";
import { WorkGallery } from "@/components/work-gallery";
import { Reviews } from "@/components/reviews";
import { ProcessTimeline } from "@/components/process-timeline";
import { Faq } from "@/components/faq";
import { AreasTicker } from "@/components/areas-ticker";
import { QuoteForm } from "@/components/quote-form";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <ServicesIndex />
        <WhyProof />
        <WorkGallery />
        <Reviews />
        <ProcessTimeline />
        <Faq />
        <AreasTicker />
        <QuoteForm />
      </main>
      <SiteFooter />
    </>
  );
}
