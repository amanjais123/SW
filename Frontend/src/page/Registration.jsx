import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [submitting, setSubmitting] = useState(false);
const navigate  = useNavigate() ;
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teamName: "",
      instituteName: "",
      members: [
        { name: "", rollNo: "", branch: "", year: "", mobile: "", email: "" },
      ],
      transactionNo: "",
      receiptFile: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  // Fetch logged-in user data and prefill team leader
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/me`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const user = res.data.user;
          reset({
            teamName: "",
            instituteName: "",
            members: [
              {
                name: user.Name || "",
                rollNo: user.rollNo || "",
                branch: user.branch || "",
                year: user.year || "",
                mobile: user.contactNumber || "",
                email: user.email || "",
              },
            ],
            transactionNo: "",
            receiptFile: null,
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUser();
  }, [reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("teamname", data.teamName);
      formData.append("Instituename", data.instituteName);
      formData.append("tranjectionId", data.transactionNo);

      if (data.members[0]) {
        formData.append("teamLeader", data.members[0].name);
        formData.append("teamLeader_email", data.members[0].email);
        formData.append("teamLeader_mobile", data.members[0].mobile);
        formData.append("teamLeader_branch", data.members[0].branch);
        formData.append("teamLeader_year", data.members[0].year);
      }

      data.members.slice(1).forEach((m, i) => {
        formData.append(`team_member${i + 1}_name`, m.name);
        formData.append(`team_member${i + 1}_email`, m.email);
        formData.append(`team_member${i + 1}_mob`, m.mobile);
        formData.append(`team_member${i + 1}_branch`, m.branch);
        formData.append(`team_member${i + 1}_year`, m.year);
      });

      if (data.receiptFile?.[0]) {
        formData.append("imagefile", data.receiptFile[0]);
      }

      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/v1/team/teams`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Optional: reset form after submission
      reset();
 navigate("/dashboard");
    } catch (err) {
      console.error("Error registering team:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const years = ["1st", "2nd", "3rd", "4th"];
  const branches = [
    "CSE",
    "IT",
    "ECE",
    "ECE(IoT)",
    "EE",
    "ME",
    "CE",
    "CHE",
    "B.PHARMA",
    "BBA",
  ];

  const bankDetails = {
    accountNo: "33542824744",
    accountName: "M.M.M. University of Technology Gorakhpur",
    ifsc: "SBIN0002578",
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
          Team Registration
        </h1>

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

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-black/30 p-4 rounded-xl flex flex-col gap-3"
          >
            <h2 className="text-yellow-400 font-semibold text-lg">
              Member {index + 1} {index === 0 && "(Team Leader)"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register(`members.${index}.name`, { required: true })}
                placeholder="Name"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <input
                {...register(`members.${index}.rollNo`)}
                placeholder="Roll No"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <select
                {...register(`members.${index}.branch`, { required: true })}
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                {...register(`members.${index}.year`, { required: true })}
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <input
                {...register(`members.${index}.mobile`, { required: true })}
                placeholder="Mobile No"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
              <input
                {...register(`members.${index}.email`, { required: true })}
                placeholder="Email"
                className="px-4 py-2 rounded-lg bg-black/40 text-white"
              />
            </div>
            {index > 0 && (
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

        {fields.length < 5 && (
          <button
            type="button"
            onClick={() =>
              append({
                name: "",
                rollNo: "",
                branch: "",
                year: "",
                mobile: "",
                email: "",
              })
            }
            className="self-start px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-lg font-semibold transition-colors"
          >
            Add Player
          </button>
        )}

        <div className="bg-black/30 p-4 rounded-xl flex flex-col gap-3 mt-6">
          <h2 className="text-yellow-400 font-semibold text-lg">
            Bank Details (For Payment)
          </h2>
          <p className="text-white">Account Number: {bankDetails.accountNo}</p>
          <p className="text-white">Account Name: {bankDetails.accountName}</p>
          <p className="text-white">IFSC Code: {bankDetails.ifsc}</p>

          <input
            {...register("transactionNo", { required: true })}
            placeholder="Transaction Id"
            className="px-4 py-2 rounded-lg bg-black/20 text-white mt-4"
          />

          <h2 className="text-white mt-4">Upload Screenshot of Payment</h2>
          <input
            type="file"
            {...register("receiptFile", { required: true })}
            className="px-4 py-2 rounded-lg bg-black/20 text-white"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-black/40 text-yellow-400 border border-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
          >
            ⬅ Back to Home
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-transform hover:scale-105 ${
              submitting ? "opacity-50 cursor-not-allowed" : "hover:from-orange-600 hover:to-yellow-500"
            }`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
