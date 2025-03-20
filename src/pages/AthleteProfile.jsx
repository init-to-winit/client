import React, { useState, useEffect } from "react";
import api from "@/api/config";
import { useParams } from "react-router-dom";
import {
  Activity,
  Calendar,
  Droplet,
  Moon,
  Award,
  AlertTriangle,
  Utensils,
  UserX,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import ProfilePicture from "@/components/common/ProfilePicture";

export default function AthleteProfile() {
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { athleteId } = useParams();

  const fetchAthleteData = async () => {
    if (!athleteId) {
      setError("No athlete ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.athletes.getAthlete(athleteId);

      if (response.data.success) {
        setAthlete(response.data.athleteData);
      } else {
        setError(response.data.message || "Failed to fetch athlete data");
        setAthlete(null);
      }
    } catch (error) {
      console.error("Error fetching athlete data:", error);
      setError(
        "An error occurred while fetching athlete data. Please try again later."
      );
      setAthlete(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthleteData();
  }, [athleteId]);

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-20 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Data Not Available
      </h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
        <button
          onClick={fetchAthleteData}
          className="flex items-center px-4 py-2 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#002E25] rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-gray-600">Loading athlete profile...</p>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-20 text-center">
      <UserX className="h-12 w-12 text-gray-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No Athlete Found
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't find any athlete data with the provided ID.
      </p>
      <button
        onClick={() => window.history.back()}
        className="flex items-center px-4 py-2 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] transition-colors mx-auto"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </button>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!athlete) return <EmptyState />;

  const { basicInfo, dietaryInfo, healthcareDetails, performanceStats } =
    athlete;

  // Helper to determine performance color
  const getPerformanceColor = () => {
    const winRate = performanceStats?.win_rate;
    if (winRate >= 75) return "text-green-500";
    if (winRate >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  // Helper to determine health indicator
  const getHealthStatus = () => {
    const injuries = healthcareDetails?.injury_history?.length;
    const bmi = parseFloat(healthcareDetails?.bmi);
    const sleep = healthcareDetails?.sleep_hours;

    if (injuries === 0 && bmi >= 18.5 && bmi <= 24.9 && sleep >= 7) {
      return { status: "Excellent", color: "bg-green-500" };
    } else if (injuries <= 1 && bmi >= 17 && bmi <= 30 && sleep >= 6) {
      return { status: "Good", color: "bg-blue-500" };
    } else {
      return { status: "Needs Attention", color: "bg-yellow-500" };
    }
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        {/* Header */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center">
              <ProfilePicture
                athleteId={athleteId}
                initialImage={basicInfo?.profilePictureUrl} // Assuming this is in your athlete data
              />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-[#002E25]">
                  {basicInfo.firstName} {basicInfo.lastName}
                </h1>
                <div className="flex items-center mt-2">
                  <span className="text-[#002E25]/80">
                    {basicInfo.position}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="capitalize text-[#002E25]/80">
                    {basicInfo.sport}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="text-center mr-6">
                <div className="text-3xl font-bold text-[#002E25]">
                  {performanceStats?.wins}
                </div>
                <div className="text-xs uppercase text-[#002E25]/80">Wins</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getPerformanceColor()}`}>
                  {performanceStats?.win_rate}%
                </div>
                <div className="text-xs uppercase text-[#002E25]/80">
                  Win Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center p-4 border-t">
          <div
            className={`w-3 h-3 rounded-full ${healthStatus?.color} mr-2`}
          ></div>
          <span className="font-medium text-[#002E25]">
            Health Status: {healthStatus?.status}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Basic & Performance Stats */}
        <div className="col-span-1">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-gray-500 text-sm">Date of Birth</label>
                <p className="font-medium">
                  {new Date(basicInfo?.dob)?.toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Email</label>
                <p className="font-medium">{basicInfo?.email}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Phone</label>
                <p className="font-medium">{basicInfo?.phone}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Member Since</label>
                <p className="font-medium">
                  {new Date(basicInfo?.createdAt)?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Stats Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Performance</h2>
              <Award className="text-indigo-600" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Matches</span>
                <span className="font-bold">
                  {performanceStats?.total_matches}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wins</span>
                <span className="font-bold">{performanceStats?.wins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Losses</span>
                <span className="font-bold">{performanceStats?.losses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Training Sessions/Week</span>
                <span className="font-bold">
                  {performanceStats?.practice_sessions_per_week}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-500 mb-1">Current Form</div>
                <div className="flex items-center">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${
                      performanceStats?.performance_status?.includes("Good")
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {performanceStats?.performance_status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Health & Wellness */}
        <div className="col-span-1">
          {/* Health Metrics Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Health Metrics</h2>
              <Activity className="text-green-600" />
            </div>

            <div className="space-y-6">
              {/* Physical Stats */}
              <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-gray-500 text-sm mb-1">Height</div>
                    <div className="text-xl font-bold">
                      {healthcareDetails?.height}
                      <span className="text-sm ml-1">cm</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500 text-sm mb-1">Weight</div>
                    <div className="text-xl font-bold">
                      {healthcareDetails?.weight}
                      <span className="text-sm ml-1">kg</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500 text-sm mb-1">BMI</div>
                    <div className="text-xl font-bold">
                      {healthcareDetails?.bmi}
                    </div>
                  </div>
                </div>
              </div>

              {/* Wellness Indicators */}
              <div className="space-y-4">
                {/* Hydration Level */}
                <div className="flex items-center">
                  <Droplet className="text-[#002E25] w-5 h-5 mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#002E25]/80 text-sm">
                        Hydration Level
                      </span>
                      <span className="text-sm font-medium text-[#002E25]">
                        {healthcareDetails?.hydration_level}/5
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#CDFA89] h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (healthcareDetails?.hydration_level / 5) * 100,
                            100
                          )}%`,
                          maxWidth: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Sleep Quality */}
                <div className="flex items-center">
                  <Moon className="text-[#002E25] w-5 h-5 mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#002E25]/80 text-sm">
                        Sleep Quality
                      </span>
                      <span className="text-sm font-medium text-[#002E25]">
                        {healthcareDetails?.sleep_hours} hours
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#CDFA89] h-2 rounded-full"
                        style={{
                          width: `${Math?.min(
                            (healthcareDetails?.sleep_hours / 10) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Injury History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Injury History</h2>
              <AlertTriangle className="text-orange-500" />
            </div>

            {healthcareDetails?.injury_history &&
            healthcareDetails?.injury_history?.length > 0 ? (
              <div className="space-y-4">
                {healthcareDetails?.injury_history?.map((injury, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-orange-500 pl-4 py-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {injury?.injury} Injury
                      </span>
                      <span className="text-gray-500 text-sm">
                        {injury?.date}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Recovery: </span>
                      {injury?.recoveryPlan} ({injury?.recoveryDuration})
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No injury history recorded
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Dietary Information */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Nutrition Plan</h2>
              <Utensils className="text-green-600" />
            </div>

            {dietaryInfo && dietaryInfo?.dietaryPlan ? (
              <>
                {/* Macro Breakdown */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Daily Macros
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-gray-600 text-sm">Calories</div>
                      <div className="font-bold text-xl">
                        {dietaryInfo?.dietaryPlan?.calories_per_day}
                        <span className="text-sm font-normal ml-1">kcal</span>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-gray-600 text-sm">Protein</div>
                      <div className="font-bold text-xl">
                        {dietaryInfo?.dietaryPlan?.protein_intake}
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="text-gray-600 text-sm">Carbs</div>
                      <div className="font-bold text-xl">
                        {dietaryInfo?.dietaryPlan?.carbs_intake}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-gray-600 text-sm">Fats</div>
                      <div className="font-bold text-xl">
                        {dietaryInfo?.dietaryPlan?.fats_intake}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meal Plan */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Meal Plan</h3>
                  {dietaryInfo?.dietaryPlan?.meal_plan &&
                  dietaryInfo?.dietaryPlan?.meal_plan?.length > 0 ? (
                    <div className="space-y-4">
                      {dietaryInfo?.dietaryPlan?.meal_plan?.map(
                        (meal, index) => (
                          <div
                            key={index}
                            className="border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <h4 className="font-medium">{meal?.meal}</h4>
                            </div>
                            <div className="pl-4">
                              <ul className="text-gray-600">
                                {meal?.items &&
                                  meal.items.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center py-1"
                                    >
                                      <span className="w-1 h-1 rounded-full bg-gray-400 mr-2"></span>
                                      {item}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No meal plan available
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No dietary information available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
