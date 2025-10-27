import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const LeaderDashboard = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API}api/v1/team/teamdetails`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setTeam(res.data.data);
        console.log(res.data.data);
      } else {
        setTeam(null);
        toast.error(res.data.message || "No team found");
      }
    } catch (err) {
      console.error(err.response || err);
      if (err.response?.status === 401) {
        toast.error("You are not logged in");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to fetch team data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}api/v1/auth/logout`,
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

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Background & blur */}
      <img
        src="/bg2.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center -z-20"
        draggable="false"
      />
      <div className="absolute inset-0 bg-black/50 -z-10 backdrop-blur-sm" />

      {/* Main Flex Container */}
      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-black/80 text-white p-6 md:flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xl font-bold mb-6">Leader Dashboard</h2>
            <ul className="space-y-4">
              {!team ? (
                <li>
                  {/* <button
                    className="w-full bg-indigo-500 hover:bg-indigo-700 p-2 rounded"
                    onClick={() => navigate("/register")}
                  >
                    Register Team
                  </button> */}
                </li>
              ) : (
                <li>
                  {/* <button
                    className="w-full bg-yellow-400 hover:bg-yellow-500 p-2 rounded"
                    disabled
                    onClick={() =>
                      navigate(`/edit-team/${encodeURIComponent(team.teamLeader_email)}`)
                    } // ✅ using leader email instead of teamId
                  >
                    Edit Team Details
                  </button> */}
                </li>
              )}
            </ul>
          </div>

          <button
            className="w-full bg-red-500 hover:bg-red-700 p-2 rounded flex items-center justify-center gap-2 mt-6"
            onClick={handleLogout}
          >
            <FiLogOut size={20} /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-auto">
          {!team ? (
            <div className="text-center mt-20 text-white">
              {/* <h2 className="text-2xl font-bold text-gray-200">
                No Team Registered Yet
              </h2>
              <p className="text-gray-300 mt-2">
                Click the "Register Team" button to register.
              </p>
                <button
                    className="w-32 h-12 bg-yellow-500 hover:bg-yellow-700 mx-auto mt-3 rounded"
                    onClick={() => navigate("/register")}
                  >
                    Register Team
                  </button> */}
                  <div className="mt-12">
                    <h2 className="text-centre text-yellow-500 font-bold">
                      Registration Closed !! 
                    </h2>
                  </div>
            </div>
          ) : (
            <div className="bg-black/70 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                Team: {team.teamname}
              </h2>
              <p className="text-gray-300 mb-2">
                Institute: {team.Instituename}
              </p>
              <p className="text-gray-300 mb-4">
                Transaction ID:{" "}
                <span className="font-semibold text-yellow-400">
                  {team.tranjectionId}
                </span>
              </p>

              <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                Team Leader
              </h3>
              <div className="mb-4 border p-3 rounded bg-black/30">
                <p>
                  <strong>Name:</strong> {team.teamLeader}
                </p>
                <p>
                  <strong>Email:</strong> {team.teamLeader_email}
                </p>
                <p>
                  <strong>Mobile:</strong> {team.teamLeader_mobile}
                </p>
                <p>
                  <strong>Branch:</strong> {team.teamLeader_branch}
                </p>
                <p>
                  <strong>Year:</strong> {team.teamLeader_year}
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                Members
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => {
                  const name = team[`team_member${i}_name`];
                  if (!name) return null;
                  return (
                    <div key={i} className="border p-3 rounded bg-black/30">
                      <p>
                        <strong>Name:</strong> {name}
                      </p>
                      <p>
                        <strong>Email:</strong> {team[`team_member${i}_email`]}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {team[`team_member${i}_mob`]}
                      </p>
                      <p>
                        <strong>Branch:</strong> {team[`team_member${i}_branch`]}
                      </p>
                      <p>
                        <strong>Year:</strong> {team[`team_member${i}_year`]}
                      </p>
                    </div>
                  );
                })}
              </div>

              {team.image_url && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                    Payment Proof
                  </h3>
                  <img
                    src={team.image_url}
                    alt="Payment Proof"
                    className="w-72 rounded shadow"
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LeaderDashboard;
