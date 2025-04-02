import HeroSection from "../components/hero";
import Incentives from "../components/incentives";
import Team from "../components/team";
import CTA from "../components/cta";
import Clients from "../components/clients";
import Newsletter from "../components/newsletter";
import Testimonial from "../components/testimonial";
import Lastestposts from "../components/latestposts";
import { WebVitals } from "./web-vitals";

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <WebVitals />
      <HeroSection />
      <Incentives />
      <Team />
      <CTA />
      <Clients />
      <Newsletter />
      <Testimonial />
      <Lastestposts />
    </>
  );
}
