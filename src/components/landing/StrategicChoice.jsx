export default function StrategicChoice() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex gap-32">
          {/* Hero section */}
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 ">
              We are a <br />
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4  inline-block bg-lime-200 px-3 py-1 rounded">
                Strategic choice
              </h1>
            </h1>
            <p className="text-gray-600 mb-8">
              World-class athlete management, built for peak performance—Vismoh
              delivers excellence every time.
            </p>

            <button className="bg-black text-white flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
              <span className="flex items-center justify-center w-6 h-6">
                ▶
              </span>
              <span>Watch Video Guide</span>
            </button>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-lime-50 text-lime-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Personalized Analytics & Health Care
              </h3>
              <p className="text-gray-600 text-sm">
                Players receive customized performance analytics along with
                healthcare and dietary recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-lime-50 text-lime-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Career Growth Insights
              </h3>
              <p className="text-gray-600 text-sm">
                Players get tailored sponsor and coach suggestions based on
                their performance and specific needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-lime-50 text-lime-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Athlete Discovery & Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Coaches and sponsors can find top-performing athletes across all
                sports and access their performance analytics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-lime-50 text-lime-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Player Development & Suggestions
              </h3>
              <p className="text-gray-600 text-sm">
                Trust our team of experts to deliver what you need now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
