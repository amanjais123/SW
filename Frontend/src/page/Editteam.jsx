import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";

const TeamForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teamName: "",
      instituteName: "",
      transactionNo: "",
      receiptFile: null,
      existingReceipt: "",
      members: [
        { name: "", email: "", mobile: "", branch: "", year: "" },
        { name: "", email: "", mobile: "", branch: "", year: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API}api/v1/team/teamdetails`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const t = res.data.data;

        const teamData = {
          teamName: t.teamname || "",
          instituteName: t.Instituename || "",
          transactionNo: t.tranjectionId || "",
          receiptFile: null,
          existingReceipt: t.image_url || "",
          members: [
            {
              name: t.teamLeader || "",
              email: t.teamLeader_email || "",
              mobile: t.teamLeader_mobile || "",
              branch: t.teamLeader_branch || "",
              year: t.teamLeader_year || "",
            },
            {
              name: t.team_member1_name || "",
              email: t.team_member1_email || "",
              mobile: t.team_member1_mob || "",
              branch: t.team_member1_branch || "",
              year: t.team_member1_year || "",
            },
          ],
        };

        reset(teamData);
      } else {
        toast.error(res.data.message || "No team found");
      }
    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data?.message || "Failed to fetch team data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

const onSubmit = async (data) => {
  try {
    // Assuming you have the leader's email stored in the form data or separately
    const leaderEmail = data.members?.[0]?.email;
 // or wherever you store leader email

    if (!leaderEmail) {
      console.log("no email")
      toast.error("Leader email is required to update team");
      return;
    }

    const response = await axios.put(
      `${import.meta.env.VITE_PUBLIC_API}api/v1/team/update/${leaderEmail}`, // adjust base URL if different
      data
    );

    if (response.data.success) {
      toast.success("Team details updated successfully");
      console.log("Updated Team:", response.data.data);
    } else {
      toast.error(response.data.message || "Failed to update team");
    }
  } catch (error) {
    console.error("Error updating team:", error);
    toast.error(
      error.response?.data?.message || "Something went wrong while updating team"
    );
  }
};
  return (
    <div className="relative w-screen min-h-screen flex justify-center items-start pt-16 px-4 md:px-0">
      <img
        src="/bg2.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
        draggable="false"
      />
      <div className="absolute inset-0 bg-black/50 -z-10 backdrop-blur-sm" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-black/70 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-4xl flex flex-col gap-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-6">
          Edit Team
        </h1>

        {/* Team Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("teamName", { required: "Team Name is required" })}
            placeholder="Team Name"
            className="px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-300 focus:outline-none"
          />
          <input
            {...register("instituteName", {
              required: "Institute Name is required",
            })}
            placeholder="Institute Name"
            className="px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-300 focus:outline-none"
          />
        </div>

        {/* Members */}
        {fields.map((member, index) => (
          <div
            key={member.id}
            className="bg-black/30 p-4 rounded-xl flex flex-col gap-3"
          >
            <h2 className="text-yellow-400 font-semibold text-lg">
              Member {index + 1} {index === 0 && "(Team Leader)"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register(`members.${index}.name`)}
                placeholder="Name"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <input
                {...register(`members.${index}.email`)}
                placeholder="Email"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <input
                {...register(`members.${index}.mobile`)}
                placeholder="Mobile"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <input
                {...register(`members.${index}.branch`)}
                placeholder="Branch"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <input
                {...register(`members.${index}.year`)}
                placeholder="Year"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
            </div>

            {index > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="self-end text-red-500 hover:text-red-400 font-semibold mt-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add Member Button */}
        <button
          type="button"
          onClick={() =>
            append({ name: "", email: "", mobile: "", branch: "", year: "" })
          }
          className="self-start px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-lg font-semibold transition-colors"
        >
          Add Member
        </button>

    

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
