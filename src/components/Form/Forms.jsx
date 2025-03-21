import React, { useEffect } from 'react';
import Logo from '../../assets/images/Logo.png';

const Forms = ({
  isOpen,
  onClose,
  title,
  description = 'Please fill in the required details below.',
  fields,
  Data,
  onSubmit,
}) => {
  console.log('data', Data);
  const [formData, setFormData] = React.useState(Data);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (Data) {
      const initialData = {
        calories_per_day: Data?.calories_per_day || '',
        protein_intake: Data?.protein_intake
          ? Number(Data.protein_intake.replace(/[^\d.-]/g, ''))
          : '',
        carbs_intake: Data?.carbs_intake
          ? Number(Data.carbs_intake.replace(/[^\d.-]/g, ''))
          : '',
        fats_intake: Data?.fats_intake
          ? Number(Data.fats_intake.replace(/[^\d.-]/g, ''))
          : '',
        breakfast_items:
          Data?.meal_plan
            ?.find((meal) => meal.meal === 'Breakfast')
            ?.items.join(', ') || '',
        lunch_items:
          Data?.meal_plan
            ?.find((meal) => meal.meal === 'Lunch')
            ?.items.join(', ') || '',
        dinner_items:
          Data?.meal_plan
            ?.find((meal) => meal.meal === 'Dinner')
            ?.items.join(', ') || '',

        // Healthcare data
        hydration_level: Data?.hydration_level || 0,
        sleep_hours: Data?.sleep_hours || '',
        height: Data?.height || '',
        weight: Data?.weight || '',
        bmi: Data?.bmi ? Number(Data.bmi.replace(/[^\d.-]/g, '')) : '',

        // Injury history
        injury: Data?.injury_history?.[0]?.injury || '',
        recoveryPlan: Data?.injury_history?.[0]?.recoveryPlan || '',
        recoveryDuration: Data?.injury_history?.[0]?.recoveryDuration
          ? Number(
              Data.injury_history[0].recoveryDuration.replace(/[^\d.-]/g, '')
            )
          : '',
        date: Data?.injury_history?.[0]?.date || '',

        total_matches: Data?.total_matches || '',
        wins: Data?.wins || '',
        losses: Data?.losses || '',
        practice_sessions_per_week: Data?.practice_sessions_per_week || '',
      };

      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [Data]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-lg w-full max-w-md max-h-[90vh] shadow-xl transform transition-all duration-300 overflow-y-auto p-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
              <div>
                <h2 className="text-xl font-semibold text-primary bg-secondary px-1 inline-block">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-ptext">{description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-primary mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          ))}

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-white hover:text-primary transition-colors hover:border hover:border-gray-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forms;
