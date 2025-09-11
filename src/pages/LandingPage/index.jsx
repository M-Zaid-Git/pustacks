import { NavBar, HeroSection, Footer } from '../../components';
import BackToTop from '../../components/backtotop';
import Content from '../../components/content';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-all duration-300">
      <NavBar />
      
      {/* Modern seamless layout without harsh padding */}
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <Content />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default LandingPage;
