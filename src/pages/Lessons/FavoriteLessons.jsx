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
  const [selectedLesson, setSelectedLesson] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const updaterFormRef = useRef(null);

  const { data: favLessons = [], isLoading, refetch: myLessonRefetch, error } = useQuery({
    queryKey: ["favLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDownloadPdf = () => {
    if (favLessons.length === 0) {
      toast.info("No order to download");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(18);
    doc.text("My Favorute Lessons", 14, 20);

    const tableColumn = [
      "SI No", "Title", "Category", "Tone", "Access Level", "Visibility"
    ];

    const tableRow = favLessons.map((lesson, index) => [
      index + 1,
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

    doc.save(`my-orders.pdf`);
    toast.success("Download successful.");
  };

  const handleDeleteLesson = async (lesson) => {
    const result = await Swal.fire({
      title: "Are you sure to delete the lesson ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/lessons/${lesson._id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      myLessonRefetch();
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-primary">
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

      {favLessons.length === 0 && (
        <p className="text-gray-600 text-center py-10">
          You haven't created any lessons yet.
        </p>
      )}

      <div className="relative -mx-4 md:mx-0 overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra min-w-[1100px] w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap">SI</th>
              <th className="whitespace-nowrap">Image</th>
              <th className="whitespace-nowrap">Title</th>
              <th className="whitespace-nowrap">Category</th>
              <th className="whitespace-nowrap">Tone</th>
              <th className="whitespace-nowrap">Access Level</th>
              <th className="whitespace-nowrap">Visibility</th>
              <th className="whitespace-nowrap text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {favLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th className="whitespace-nowrap">{index + 1}</th>
                <td className="min-w-[100px]">
                  <img
                    className="w-20 h-20 rounded-3xl object-cover"
                    src={lesson?.image}
                    alt="lesson"
                  />
                </td>
                <td className="min-w-[260px]">
                  <p className="font-medium truncate max-w-[240px]">
                    {lesson?.title}
                  </p>
                </td>
                <td className="min-w-[140px] whitespace-nowrap">
                  {lesson?.category}
                </td>
                <td className="min-w-[140px] whitespace-nowrap">
                  {lesson?.emotionalTone}
                </td>
                <td className="min-w-[140px] whitespace-nowrap">
                  {lesson?.accessLevel}
                </td>
                <td className="min-w-[130px] whitespace-nowrap">
                  {lesson?.visibility}
                </td>
                <td className="min-w-[190px] whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Link
                      to={`/dashboard/my-lessons/${lesson?._id}`}
                      className="btn btn-sm btn-outline btn-info w-full"
                    >
                      <MdInfoOutline />
                      <span className="hidden sm:inline ml-1">Details</span>
                    </Link>
                    <button
                      onClick={() => updaterFormRef.current.showModal()}
                      className="btn btn-sm btn-outline btn-primary w-full"
                    >
                      <FaRegEdit />
                      <span className="hidden sm:inline ml-1">Update</span>
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson)}
                      className="btn btn-sm btn-outline btn-error w-full"
                    >
                      <RiDeleteBin5Fill />
                      <span className="hidden sm:inline ml-1">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoriteLessons;
