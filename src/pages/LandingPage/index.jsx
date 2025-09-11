import { NavBar, HeroSection, Footer } from '../../components';
import BackToTop from '../../components/backtotop';
import Content from '../../components/content';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <NavBar />
      
      {/* Main Content */}
      <main className="">
        <HeroSection />
        <Content />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default LandingPage;
