import CardData from '../config/CardData.mjs';
import { CategoryCards } from '../components';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Seamless background that flows with hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/60 dark:via-slate-800/30 dark:to-slate-800/60"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-pink-500/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            ✨ Explore Categories
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Find Your</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Perfect Resource</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover expertly curated learning materials across every discipline. 
            From cutting-edge research to fundamental concepts - we've got you covered.
          </p>
        </div>

        {/* Modern Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {CardData.map((value) => {
            return <CategoryCards key={value.id} card={value} />;
          })}
        </div>

        {/* Modern CTA Section */}
        <div className="text-center">
          <div className="relative group max-w-4xl mx-auto">
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to dive deeper?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Explore our comprehensive library of educational resources. From beginner guides 
                    to advanced research papers - find exactly what you need to excel in your studies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => navigate('/materials/all')}
                      className="group relative inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      <span className="relative">Browse All Resources</span>
                    </button>
                    <button 
                      onClick={() => navigate('/categories')}
                      className="px-6 py-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-xl font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      View Categories
                    </button>
                  </div>
                </div>
                
                {/* Decorative illustration space */}
                <div className="hidden md:flex justify-center items-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl opacity-20 rotate-12"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl opacity-30 rotate-45"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-25"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
