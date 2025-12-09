import { Link } from "react-router";
import React, { useState } from 'react'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import ShowComments from "./ShowComments";
export default function LessonComments({ user ,lesson,refetchDetails }) {
  const axiosInstance = useAxiosSecure()
  const [comment, setComment] = useState("");


  const handleComment =async () => {
    const comments = {
    lessonId : lesson._id,
    commentCreatorEmail: user.email,
      comment,
    createdAt : new Date()
  }
    const result = await axiosInstance.post("/create-comment", comments);
    setComment("")
    refetchDetails()
    toast.success("Successfully commented!")
  };
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div>
      {user?.email ? (
        <>
            <textarea
              value={comment}
            onChange={e=>setComment(e.target.value)}
            className="textarea textarea-bordered w-full" placeholder="Write a comment..." />
          <button
            onClick={handleComment}
            className="btn btn-primary mt-3">Post Comment</button>
        </>
      ) : (
        <p className="text-base-content/70 mb-4">
          Please <Link className="link link-primary" to="/login">log in</Link> to comment.
        </p>
      )}

      </div>

      <div className="mt-3">
        <ShowComments lesson={lesson} email={ user.email} />
      </div>
    </section>
  );
}
