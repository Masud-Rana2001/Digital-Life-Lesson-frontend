import { Link } from "react-router";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import ShowComments from "./ShowComments";

export default function LessonComments({ user, lesson, refetchDetails }) {
  const axiosSecure = useAxiosSecure();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    if (!comment.trim()) {
      return toast.error("Comment cannot be empty!");
    }

    try {
      setLoading(true);

      const commentData = {
        lessonId: lesson._id,
        comment,
        createdAt: new Date(),
      };

      await axiosSecure.post("/create-comment", commentData);

      setComment("");
      toast.success("Comment added!");
      refetchDetails();

    } catch (error) {
      console.error(error);
      toast.error("Failed to comment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* COMMENT INPUT */}
      {user?.email ? (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full h-28"
            placeholder="Write your thoughts..."
          />

          <button
            onClick={handleComment}
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </>
      ) : (
        <p className="text-base-content/70 mb-4">
          Please{" "}
          <Link className="link link-primary" to="/login">
            log in
          </Link>{" "}
          to comment.
        </p>
      )}

      {/* COMMENT LIST */}
      <div className="mt-6">
        <ShowComments lesson={lesson} email={user?.email} />
      </div>
    </section>
  );
}
