import coverImg from "../../assets/images/cover.png";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../pages/Lessons/LessonCard";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch created lessons count
  const { data: createdLessons = [] , refetch :createdLessonsReFetch} = useQuery({
    queryKey: ["created-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch saved lessons count
  const { data: savedLessons = [] } = useQuery({
    queryKey: ["saved-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons`);
      return res.data;
    },
  });
  // Fetch user data from DB
  const { data: userDB = [] } = useQuery({
    queryKey: ["userDB", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });
 
 

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl  bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
      bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
      bg-no-repeat bg-cover overflow-hidden border border-gray-300">

        {/* Cover Image Section */}
        <div className="relative">
          <img src={coverImg} alt="Cover" className="w-full h-60 object-cover" />

          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover ring-4 ring-base-100 shadow-xl"
            />
          </div>
        </div>

        {/* User Information */}
        <div className="mt-20 text-center px-6 pb-10">

          <h2 className="text-3xl font-bold text-base-content flex items-center justify-center gap-2">
            {user?.displayName || "Unknown User"}

            {/* Premium Badge */}
            {userDB?.isPremium && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-900 rounded-md font-bold border border-amber-600">
                ⭐ Premium
              </span>
            )}
          </h2>

          <p className="text-sm text-base-content/60 mt-1">{user?.email}</p>

          <div className="mt-3">
            <span className="px-4 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              User ID: {user?.uid}
            </span>
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-base-200 p-4 rounded-lg shadow-sm border border-base-300 text-center">
              <h3 className="text-xl font-bold">{createdLessons.length}</h3>
              <p className="text-sm text-base-content/60">Lessons Created</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg shadow-sm border border-base-300 text-center">
              <h3 className="text-xl font-bold">{savedLessons.length}</h3>
              <p className="text-sm text-base-content/60">Lessons Saved</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg shadow-sm border border-base-300 text-center">
              <h3 className="text-xl font-bold text-yellow-500">
                {userDB?.isPremium ? "Active" : "Free User"}
              </h3>
              <p className="text-sm text-base-content/60">Membership</p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-8"></div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn btn-outline btn-primary px-8 rounded-full">
              Update Profile
            </button>

            <button className="btn btn-outline btn-success px-8 rounded-full">
              Change Password
            </button>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard/my-lessons" className="btn btn-secondary btn-outline px-8 rounded-full">
              My Lessons
            </Link>

            <Link to="/dashboard/my-saved-lessons" className="btn btn-outline btn-neutral px-8 rounded-full">
              My Favourite Lessons
            </Link>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
            {
              !userDB.isPremium && (
                
            <Link to="/dashboard/my-lessons" className="btn btn-info btn-outline px-8 rounded-full">
              Update Membership
            </Link>
              )
            }

            
          </div>

          {/* Divider */}
          <div className="divider my-10"></div>

          {/* User Created Lessons Grid */}
          <div className="mt-8">
            <h3 className="text-3xl text-center font-bold mb-5 text-primary ">Your Created Lessons</h3>

            {createdLessons.length === 0 && (
              <p className="text-base-content/60">You haven't created any lessons yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {createdLessons.map((lesson) => (
                       <LessonCard
                         key={lesson._id}
                         lesson={lesson}
                         user={user}
                         myLessonRefetch={createdLessonsReFetch}
                         // isPremiumUser={user?.premium === true} // optional
                       />
                     ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
