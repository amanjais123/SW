import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_PUBLIC_API}/api/v1/team/teams`);
        setTeams(res.data.data || []);
      } catch (err) {
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-yellow-400 text-xl animate-pulse">
          Loading teams...
        </p>
      </div>
    );
  }

  const filteredTeams = teams.filter((team) =>
    team.teamname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-2">
        Registered Teams
      </h1>
      <p className="text-center text-gray-300 mb-6">
        Total Teams Registered:{" "}
        <span className="text-yellow-400 font-semibold">{teams.length}</span>
      </p>

      <div className="flex justify-center mb-8 rounded-lg">
        <input
          type="text"
          placeholder="Search by Team Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-black/40 text-white placeholder-gray-400 placeholder-gray-400 ring-2 ring-yellow-400"
        />
      </div>

      {filteredTeams.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No teams found with the given name.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <div
              key={team._id}
              className="bg-black/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 border border-yellow-500/30"
            >
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                Team Name: {team.teamname}
              </h2>
              <p className="text-gray-300 text-sm mb-2">
                <span className="font-semibold">Institute:</span>{" "}
                {team.Instituename}
              </p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="font-semibold">Leader:</span>{" "}
                {team.teamLeader} ({team.teamLeader_email})
              </p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="font-semibold">Transaction ID:</span>{" "}
                {team.tranjectionId}
              </p>

              <div className="mt-3">
                <h3 className="text-yellow-300 text-sm font-semibold mb-1">
                  Members:
                </h3>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {[team.team_member1_name, team.team_member2_name, team.team_member3_name, team.team_member4_name]
                    .map((name, idx) => name ? (
                      <li key={idx}>
                        {name}{" "}
                        <span className="text-gray-400">
                          ({[
                            team.team_member1_email,
                            team.team_member2_email,
                            team.team_member3_email,
                            team.team_member4_email,
                          ][idx]})
                        </span>
                      </li>
                    ) : null)}
                </ul>
              </div>

              {team.image_url && (
                <div className="mt-4">
                  <h3 className="text-yellow-300 text-sm font-semibold mb-2">
                    Payment Screenshot:
                  </h3>
                  <img
                    src={team.image_url}
                    alt="Payment Receipt"
                    className="w-full h-40 object-cover rounded-lg border border-yellow-500/30"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
