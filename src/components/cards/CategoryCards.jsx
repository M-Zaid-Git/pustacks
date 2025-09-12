import { Link } from 'react-router-dom';

const CategoryCards = (props) => {
  return (
    <Link to={props.card.link} className="group block">
      <div className="floating-card h-64 lg:h-72 p-6 relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-indigo-900 dark:to-purple-900 opacity-60"></div>

        {/* Floating Background Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img
            src={`/${props.card.image}`}
            alt={props.card.domain}
            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-lg font-bold">{props.card.domain.charAt(0)}</span>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {props.card.domain}
            </h3>

            {/* Subtitle/Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore {props.card.domain.toLowerCase()} resources
            </p>

            {/* Action Arrow */}
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
              <span className="text-sm font-medium mr-2">Explore</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
      </div>
    </Link>
  );
};

export default CategoryCards;
