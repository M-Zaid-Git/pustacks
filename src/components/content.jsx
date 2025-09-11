import CardData from '../config/CardData.mjs';
import { CategoryCards } from '../components';

const Content = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-10 dark:opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-10 dark:opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-4 py-2 rounded-full">
              EXPLORE CATEGORIES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6">
            <span className="gradient-text">Choose Your</span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">Learning Path</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover a world of knowledge with our carefully curated categories. 
            From coding to design, find exactly what you need to excel.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {CardData.map((value) => {
            return <CategoryCards key={value.id} card={value} />;
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Don't see what you're looking for?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our community is always growing. Suggest a new category or contribute your own resources!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-6 py-3">
                Suggest Category
              </button>
              <button className="btn-secondary px-6 py-3">
                Browse All Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
