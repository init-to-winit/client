import React, { useState } from 'react';
import sportsRules from '../constants/sportsRules.json';

const SportsList = () => {
  const [expandedSport, setExpandedSport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const user = JSON.parse(localStorage.getItem('user'));
  const sport = user?.sport;
  const role = user?.role;

  if (!sportsRules || !sportsRules.sports) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border">
        <p className="text-gray-600">Error: Sports data is not available.</p>
      </div>
    );
  }

  const categories = [
    'All',
    ...new Set(
      sportsRules.sports.map((sport) => sport?.category).filter(Boolean)
    ),
  ];

  const getFilteredSports = () => {
    // If role is Athlete, only show their specific sport
    if (role === 'Athlete' && sport) {
      return sportsRules.sports.filter(
        (s) => s?.name?.toLowerCase() === sport.toLowerCase()
      );
    }

    // For Sponsor/Coach or other roles, apply normal filtering
    return sportsRules.sports.filter((sport) => {
      if (!sport) return false;
      const matchesSearch =
        sport?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false;
      const matchesCategory =
        filterCategory === 'All' || sport?.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredSports = getFilteredSports();

  const toggleSport = (sportName) => {
    setExpandedSport(expandedSport === sportName ? null : sportName);
  };

  const renderContent = (content) => {
    if (!content)
      return <p className="text-gray-600">No information available.</p>;

    if (typeof content === 'string') {
      return <p className="text-gray-700">{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-5 text-gray-700">
          {content.map((item, index) => (
            <li key={index}>
              {typeof item === 'object' && item !== null
                ? renderContent(item)
                : item}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-2">
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              {key !== 'description' && (
                <p className="text-gray-700 font-medium capitalize">
                  {key.replace(/_/g, ' ')}:
                </p>
              )}
              {renderContent(value)}
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-gray-600">Unsupported content format.</p>;
  };

  const renderSportDetails = (sport) => {
    if (!sport || !sport.rules) {
      return <p className="text-gray-600">No rules information available.</p>;
    }

    const knownSections = [
      { key: 'objective', title: 'Objective' },
      { key: 'equipment', title: 'Equipment' },
      { key: 'playing_area', title: 'Playing Area' },
      { key: 'scoring', title: 'Scoring' },
      { key: 'basic_rules', title: 'Basic Rules' },
      { key: 'competition_format', title: 'Competition Format' },
      { key: 'Olympic_events', title: 'Olympic Events' },
    ];

    const additionalFields = Object.keys(sport.rules).filter(
      (key) => !knownSections.some((section) => section.key === key)
    );

    return (
      <div className="p-4 space-y-4">
        {knownSections.map(
          (section) =>
            sport.rules[section.key] && (
              <div key={section.key}>
                <h3 className="text-lg font-semibold mt-2 mb-2 text-gray-800">
                  {section.title}
                </h3>
                {renderContent(sport.rules[section.key])}
              </div>
            )
        )}
        {additionalFields.map((key) => (
          <div key={key}>
            <h3 className="text-lg font-semibold mt-2 mb-2 text-gray-800">
              {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </h3>
            {renderContent(sport.rules[key])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Olympic Sports Rules
      </h1>

      {/* Hide search and filter for Athletes */}
      {role !== 'Athlete' && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search sports..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {filteredSports.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border">
          <p className="text-gray-600">
            {role === 'Athlete'
              ? 'Your sport information is not available.'
              : 'No sports match your search criteria.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSports.map((sport) => (
            <div
              key={sport?.name}
              className="border rounded-lg bg-white shadow-sm"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => toggleSport(sport?.name)}
              >
                <h2 className="text-xl font-semibold m-0">
                  {sport?.name ?? 'Unknown Sport'}
                </h2>
                <div className="flex items-center gap-3">
                  {sport?.category && (
                    <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {sport?.category}
                    </span>
                  )}
                  <span className="text-2xl font-bold">
                    {expandedSport === sport?.name ? '−' : '+'}
                  </span>
                </div>
              </div>
              {expandedSport === sport?.name && renderSportDetails(sport)}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center text-gray-500 text-sm">
        Displaying {filteredSports.length} of{' '}
        {role === 'Athlete' ? '1' : sportsRules.sports.length} sports
      </div>
    </div>
  );
};

export default SportsList;
