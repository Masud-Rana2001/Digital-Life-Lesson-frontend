import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { MdInfoOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import UpdateLessonForm from './UpdateLessonForm';
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { toast } from 'react-hot-toast';


function FavoriteLessons() {
 
  const [page, setPage] = useState(1);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const updaterFormRef = useRef(null);

  
  const { data, isLoading, refetch: myLessonRefetch, error } = useQuery({
    queryKey: ["favLessons", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons?page=${page}&limit=6`);
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true, // smooth pagination
  });
  


  const favLessons = data?.lessons || [];
  const totalPages = data?.totalPages || 1;

  const handleDownloadPdf = () => {
    if (favLessons.length === 0) {
      toast.info("No lessons to download");
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.setFontSize(18);
    doc.text("My Favorite Lessons", 14, 20);

    const tableColumn = [
      "SI No", "Title", "Category", "Tone", "Access Level", "Visibility"
    ];

    const tableRow = favLessons.map((lesson, index) => [
      (page - 1) * 6 + index + 1,
      lesson.title,
      lesson.category,
      lesson.emotionalTone,
      lesson.accessLevel,
      lesson.visibility
    ]);

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRow,
      theme: "striped",
      headStyles: { fillColor: [14, 165, 233], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 249, 255] },
      styles: { fontSize: 11, cellPadding: 3 },
    });

    doc.save(`my-favorite-lessons.pdf`);
    toast.success("Download successful.");
  };

  const handleRemoveFromFavList = async (lesson) => {
    const result = await Swal.fire({
      title: "Are you sure to remove the lesson from favorite list ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!"
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/remove-from-fav`, {
      lessonId: lesson._id
    });
      Swal.fire("Removed!", "Your lesson has been removed from favorite list.", "success");
      myLessonRefetch();
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <div className="w-full px-2 sm:px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          📚 My Favorite Lessons
        </h1>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="btn btn-primary btn-outline w-full sm:w-auto rounded-full"
        >
          Download Report ⬇️
        </button>
      </div>

      {favLessons.length === 0 ? (
        <p className="text-gray-600 text-center py-10">
          You haven't favorited any lessons yet.
        </p>
      ) : (
          
      <div className="relative -mx-2 sm:mx-0 overflow-x-auto">
        <table className="table table-xs table-pin-rows min-w-[600px]">
          <thead>
            <tr>
              <th>SI</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Access Level</th>
              <th>Visibility</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {favLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{(page - 1) * 6 + index + 1}</th>

                <td>
                  <div className="avatar shrink-0">
                    <img
                      className="w-10 h-10 sm:w-12 sm:h-12 mask mask-squircle"
                      src={lesson?.image}
                      alt="lesson"
                    />
                  </div>
                </td>

                <td className="max-w-[120px]">
                  <p className="truncate font-medium">{lesson?.title}</p>
                </td>

                <td>{lesson?.category}</td>
                <td>{lesson?.emotionalTone}</td>
                <td>{lesson?.accessLevel}</td>
                <td>{lesson?.visibility}</td>

                <td>
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    <Link
                      to={`/dashboard/my-lessons/${lesson?._id}`}
                      className="btn btn-xs sm:btn-sm btn-outline btn-info"
                    >
                      <MdInfoOutline />
                      <span className="hidden sm:inline ml-1">Details</span>
                    </Link>

                   
                    <button
                      onClick={() => handleRemoveFromFavList(lesson)}
                      className="btn btn-xs sm:btn-sm btn-outline btn-error"
                    >
                      <RiDeleteBin5Fill />
                      <span className="hidden sm:inline ml-1">Remove</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {page} / {totalPages}
          </span>

          <button
            className="btn btn-outline"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default FavoriteLessons;
