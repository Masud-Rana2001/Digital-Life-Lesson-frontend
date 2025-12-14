import { useState } from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

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

    try {
      await axiosInstance.post("/lessons/report", {
        lessonId: lesson._id,
        reporterEmail: user.email,
        reason,
        details,
      });

      toast.success(
        "Report submitted successfully. Thank you for your feedback!"
      );
    } catch (error) {
      console.error("Report submission failed:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setReportModalOpen(false);
      setReason("");
      setDetails("");
    }
  };

  return (
    <dialog open className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box w-full max-w-md mx-auto p-6 space-y-4 max-h-screen overflow-y-auto">
        <h3 className="text-xl font-bold text-red-600">🚨 Report Lesson</h3>

        <p className="text-sm text-base-content/70">
          Select a reason for reporting this lesson. Your report is anonymous.
        </p>

        {/* Reason select */}
        <select
          className="select select-bordered w-full"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">— Choose a reason —</option>
          {reportReasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Details */}
        <textarea
          className="textarea textarea-bordered w-full resize-none"
          placeholder="Additional details (optional)"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        {/* Actions */}
        <div className="modal-action flex flex-col-reverse sm:flex-row gap-2 border-t pt-4">
          <button
            className="btn btn-ghost w-full sm:w-auto"
            onClick={() => setReportModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-error text-white w-full sm:w-auto"
            onClick={handleReportSubmit}
            disabled={!reason}
          >
            Submit Report
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setReportModalOpen(false)}>close</button>
      </form>
    </dialog>
  );
}

export default ReportModel;
