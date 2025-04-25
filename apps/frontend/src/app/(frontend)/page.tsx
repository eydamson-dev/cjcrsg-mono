import { Cta } from '@/components/Cta';
import { FAQ } from '@/components/FAQ';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Navbar } from '@/components/Navbar';
import { Newsletter } from '@/components/Newsletter';
import { Pricing } from '@/components/Pricing';
import { Schedules } from '@/components/Schedules';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Services } from '@/components/Services';
import { Sponsors } from '@/components/Sponsors';
import { StatementOfFaith } from '@/components/StatementOfFaith';
import { Team } from '@/components/Team';
import { Testimonials } from '@/components/Testimonials';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatementOfFaith />
      <Schedules />
      <Sponsors />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
