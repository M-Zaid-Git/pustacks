import { NavBar, HeroSection, Footer } from '../../components/index.mjs';
import BackToTop from '../../components/backtotop';
import BooksSection from '../../components/BooksSection';

const LandingPage = () => {
  return (
    <>
      <div className={'flex flex-col items-start justify-center gap-20 '}>
        <NavBar />
        <HeroSection />
        <BooksSection />
        <Footer />
      </div>

      <div>
        <BackToTop />
      </div>
    </>
  );
};

export default LandingPage;
