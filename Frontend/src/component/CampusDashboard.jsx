import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlusCircle, FiList, FiLogOut } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CampusDashboard = () => {
  const [activeTab, setActiveTab] = useState("myReferrals");
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [isAmbassador, setIsAmbassador] = useState(true); // assume true until validated
const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_PUBLIC_API}api/v1/auth/me`, {
          withCredentials: true,
        });

        if (res.data?.user?.accountType !== "Campus_Ambasdor") {
          setIsAmbassador(false);
          toast.error("You are not a campus ambassador");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        toast.error("Unable to verify user");
        setIsAmbassador(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (activeTab === "myReferrals" && isAmbassador) {
      fetchReferrals();
    }
  }, [activeTab, isAmbassador]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API}api/v1/campusAmbassador/my-referrals`,
        { withCredentials: true }
      );
      setReferrals(res.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast.error("Failed to fetch referrals");
      setLoading(false);
    }
  };

  const handleAddReferral = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}api/v1/campusAmbassador/create-referral`,
        { teamName, teamLeaderName },
        { withCredentials: true }
      );
      setTeamName("");
      setTeamLeaderName("");
      toast.success("Referral added successfully!");
      setActiveTab("myReferrals");
      fetchReferrals();
    } catch (error) {
      console.error("Error adding referral:", error);
      toast.error("Failed to add referral");
    }
  };

   const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  // ✅ Block dashboard if not ambassador
  if (!isAmbassador) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <Toaster position="top-right" reverseOrder={false} />
        <p className="text-lg">Access denied</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen min-h-screen flex">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background */}
      <img
        src="/bg2.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />

      {/* Sidebar */}
      <div className="w-64 bg-black/60 backdrop-blur-md text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8">
          Ambassador Panel
        </h2>
        <ul className="space-y-4 text-lg">
          <li
            className={`flex items-center gap-2 cursor-pointer transition ${
              activeTab === "addReferral"
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-300"
            }`}
            onClick={() => setActiveTab("addReferral")}
          >
            <FiPlusCircle /> Add Referral
          </li>
          <li
            className={`flex items-center gap-2 cursor-pointer transition ${
              activeTab === "myReferrals"
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-300"
            }`}
            onClick={() => setActiveTab("myReferrals")}
          >
            <FiList /> My Referrals
          </li>
          <li
            className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300 mt-8"
            onClick={handleLogout}
          >
            <FiLogOut /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 text-white">
          {activeTab === "addReferral" && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
                Add New Referral
              </h2>
              <form
                onSubmit={handleAddReferral}
                className="space-y-4 w-full max-w-md"
              >
                <input
                  type="text"
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-md bg-black/40 text-white placeholder-gray-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Team Leader Name"
                  value={teamLeaderName}
                  onChange={(e) => setTeamLeaderName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-md bg-black/40 text-white placeholder-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-md shadow-lg transition-transform hover:scale-105"
                >
                  Add Referral
                </button>
              </form>
            </div>
          )}

          {activeTab === "myReferrals" && (
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
                My Referrals
              </h2>
              {loading ? (
                <p className="text-gray-300">Loading referrals...</p>
              ) : referrals.length === 0 ? (
                <p className="text-gray-300">No referrals found</p>
              ) : (
                <ul className="space-y-4">
                  {referrals.map((ref) => (
                    <li
                      key={ref._id}
                      className="p-4 bg-black/40 backdrop-blur-md rounded-xl flex justify-between items-center shadow-md"
                    >
                      <div>
                        <p className="font-bold text-yellow-300">
                          {ref.teamName}
                        </p>
                        <p className="text-gray-300">
                          Leader: {ref.teamLeaderName}
                        </p>
                      </div>
                     
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusDashboard;
