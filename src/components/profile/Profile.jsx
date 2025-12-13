import coverImg from "../../assets/images/cover.png";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../pages/Lessons/LessonCard";
import UpdateProfileForm from "./UpdateProfileForm";
import { useRef } from "react";

const Profile = () => {
  const { user, updateUserProfile, refreshUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const updaterFormRef = useRef();

  // Fetch created lessons
  const { data: createdLessons = [], refetch: createdLessonsReFetch } = useQuery({
    queryKey: ["created-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch saved lessons
  const { data: savedLessons = [] } = useQuery({
    queryKey: ["saved-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons`);
      return res.data;
    },
  });

  // Fetch user DB data
  const { data: userDB = [] } = useQuery({
    queryKey: ["userDB", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-2 md:py-4 ">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff]">

        {/* Cover */}
        <div className="relative">
          <img src={userDB.coverPhoto} className="w-full h-60 object-cover rounded-t-2xl" />

          {/* Avatar */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={user?.photoURL }
              className="h-40 w-40 rounded-full object-cover ring-4 ring-base-100 shadow-xl"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mt-20 text-center px-6 pb-10">

          <h2 className="text-3xl font-bold flex justify-center gap-2">
            {user?.displayName || "Unknown User"}

            {userDB?.isPremium && (
              <span className="px-2 text-xs flex justify-center items-center bg-yellow-100 text-yellow-900 rounded-md font-bold border">
                ⭐ Premium
              </span>
            )}
            {userDB?.role === "admin" && (
              <span className="px-2 text-xs flex justify-center items-center bg-yellow-50 text-yellow-900 rounded-md font-bold border">
                🤵 Admin
              </span>
            )}
          </h2>

          <p className="text-sm mt-1">{user?.email}</p>

          <div className="mt-3">
            <span className="px-4 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              User ID: {user?.uid}
            </span>
          </div>

          {/* Profile Update Button */}
          <div>

          <button
            onClick={() => updaterFormRef.current.showModal()}
            className="btn btn-outline btn-primary mt-6"
          >
            Update Profile
          </button>
            {
              !userDB?.isPremium && (

                <Link
                to="/pricing"
                className="btn btn-outline btn-secondary ms-2 mt-6"
              >
              ⭐ Update Membership
              </Link>
              ) 
          }
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-base-200 p-4 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-bold">{createdLessons.length}</h3>
              <p>Lessons Created</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-bold">{savedLessons.length}</h3>
              <p>Lessons Saved</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg shadow-sm text-center">
              <h3 className="text-xl flec justify-center items-center font-bold text-yellow-500">
                {userDB?.isPremium ? "Active" : "Free User"}
              </h3>
              <p>Membership</p>
            </div>
          </div>

          <div className="divider my-10"></div>

          {/* User Created Lessons */}
          <h3 className="text-3xl text-center font-bold mb-5 text-primary">
            Your Created Lessons
          </h3>


            {createdLessons.length === 0 && (
              <h2 className="text-2xl text-center">You have not created any lessons yet.</h2>
            )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {createdLessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                user={user}
                myLessonRefetch={createdLessonsReFetch}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <dialog ref={updaterFormRef} className="modal">
        <div className="modal-box w-11/12 max-w-lg p-2">
          <UpdateProfileForm
            updaterFormRef={updaterFormRef}
            updateUserProfile={updateUserProfile}
            refreshUser={refreshUser}
            userDB={userDB}
          />
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
