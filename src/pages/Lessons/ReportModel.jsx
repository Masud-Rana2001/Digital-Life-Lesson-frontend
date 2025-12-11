import { useState } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

function ReportModel({ lesson, user, setReportModalOpen }) {
  const axiosInstance = useAxiosSecure();

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const reportReasons = [
    "Inappropriate Content",
    "Hate Speech or Harassment",
    "Misleading or False Information",
    "Spam or Promotional Content",
    "Sensitive or Disturbing Content",
    "Other",
  ];

  const handleReportSubmit = async () => {
    if (!reason) return toast.error("Please select a reason");

    await axiosInstance.post("/lessons/report", {
      lessonId: lesson._id,
      reporterEmail: user.email,
      reason,
      details, 
    });

    setReportModalOpen(false);
    setReason("");
    setDetails("");  
    toast.success("Report submitted successfully. Thank you for your feedback. An action will be taken immediately!");
  };

  return (
    <dialog open className="modal">
      <div className="modal-box space-y-4">

        <h3 className="text-xl font-bold">Report Lesson</h3>
        <p className="text-base-content/60">
          Select a reason for reporting this lesson.
        </p>

        <select
          className="select select-bordered w-full"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Choose a reason</option>
          {reportReasons.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* DETAILS TEXTAREA */}
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Additional details (optional)"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => setReportModalOpen(false)}
          >
            Cancel
          </button>

          <button className="btn btn-error" onClick={handleReportSubmit}>
            Submit Report
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ReportModel;
