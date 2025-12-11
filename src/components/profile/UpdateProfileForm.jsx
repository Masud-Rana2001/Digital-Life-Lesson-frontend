// src/pages/Profile/UpdateProfileForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

import { imageUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function UpdateProfileForm({
  updaterFormRef,
  updateUserProfile,
  refreshUser,
  userDB,
}) {
  const axiosInstance = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
        name: userDB?.name 
      }
  });

  useEffect(() => {
    if (userDB) {
      reset({
        name: userDB.name || "",
        photo: "",
        coverPhoto: "",
      });
    }
  }, [userDB, reset]);

  const onSubmit = async (data) => {
    let profilePhotoUrl = userDB?.image;
    let coverPhotoUrl = userDB?.coverPhoto;

    if (data.photo && data.photo.length > 0) {
      Swal.fire({
        title: "Uploading Profile Photo...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        profilePhotoUrl = await imageUpload(data.photo);
      } catch (error) {
        Swal.fire("Error", "Profile photo upload failed!", "error");
        return;
      }
    }

    if (data.coverPhoto && data.coverPhoto.length > 0) {
      Swal.fire({
        title: "Uploading Cover Photo...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        coverPhotoUrl = await imageUpload(data.coverPhoto);
      } catch (error) {
        Swal.fire("Error", "Cover photo upload failed!", "error");
        return;
      }
    }

    const newName = data.name;

    try {
      Swal.fire({
        title: "Updating Profile...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await updateUserProfile(newName, profilePhotoUrl);

      const updatedUser = {
        name: newName,
        image: profilePhotoUrl,
        coverPhoto: coverPhotoUrl,
        updatedAt: new Date(),
      };

      const res = await axiosInstance.patch("/update-profile", updatedUser);
      Swal.close();

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          icon: "success",
        });

        await refreshUser();
        reset();
        updaterFormRef.current.close();
      } else {
        Swal.fire("No Changes", "Nothing was updated.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.close();
      toast.error("Update failed! Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-base-100 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold text-center">Update Profile</h2>

      <div>
        <label className="font-semibold">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          {...register("name", {
            required: { value: true, message: "Name is required." },
            minLength: { value: 3, message: "Name must be at least 3 characters." },
            validate: value => value.trim() !== "" || "Name cannot be just spaces."
          })}
          className={`w-full px-4 py-2 rounded-xl bg-base-200 border ${errors.name ? 'border-red-500' : 'border-base-300'}`}
        />
        {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
      </div>

      <div>
        <label className="font-semibold">Update Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register("photo")}
          className="w-full px-4 py-2 rounded-xl bg-base-200 border border-dashed border-base-300"
        />
      </div>

      <div>
        <label className="font-semibold">Update Cover Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register("coverPhoto")}
          className="w-full px-4 py-2 rounded-xl bg-base-200 border border-dashed border-base-300"
        />
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          Update Now
        </button>
        <button
          type="button"
          onClick={() => updaterFormRef.current.close()}
          className="btn btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
