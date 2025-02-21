import React from "react";
import Logo from "../../assets/images/Logo-white.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div>
            <img src={Logo} alt="Vismoh" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 md:grid-cols-3 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold">Vismoh</h2>
              <p className="mt-4 text-gray-400">
                Bringing vitality to sports, driven by metrics and powered by
                health.
              </p>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>

                <div className="border border-gray-700 p-2 focus-within:ring-2 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="Enter your email"
                    className="w-full border-none bg-transparent text-white placeholder-gray-400 sm:text-sm"
                  />

                  <button className="mt-1 w-full bg-secondary px-6 py-3 text-sm font-bold tracking-wide text-primary uppercase transition hover:bg-primary hover:text-secondary sm:mt-0 sm:w-auto sm:shrink-0">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Links */}
            {[
              {
                title: "Services",
                links: [
                  "Dietary",
                  "Health Care",
                  "Performance",
                  "Sponsors",
                  "Coaches",
                ],
              },
              {
                title: "Company",
                links: ["About", "Meet the Team", "Accounts Review"],
              },
              {
                title: "Helpful Links",
                links: ["Contact", "FAQs", "Live Chat"],
              },
              {
                title: "Legal",
                links: ["Accessibility", "Returns Policy", "Refund Policy"],
              },
              {
                title: "Downloads",
                links: ["Marketing Calendar", "SEO Infographics"],
              },
            ].map((section, index) => (
              <div key={index} className="col-span-2 sm:col-span-1">
                <p className="font-medium">{section.title}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-300 transition hover:text-gray-100"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media Icons */}
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {[
                {
                  name: "Facebook",
                  path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                },
                {
                  name: "Instagram",
                  path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08...",
                },
                {
                  name: "Twitter",
                  path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996...",
                },
                {
                  name: "GitHub",
                  path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343...",
                },
              ].map((icon, iconIndex) => (
                <li key={iconIndex}>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:text-white"
                  >
                    <span className="sr-only">{icon.name}</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={icon.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
