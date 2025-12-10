import React from 'react'

function useDeleteLesson() {
   const handleDeleteLesson =async () => {
      const result = await
        Swal.fire({
    title: "Are you sure to delete the lesson ?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
     });
      
      if (result.isConfirmed) {
        const res = await axiosInstance.delete(`/lessons/${lessonId}`);
        console.log(res)
        Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      }
      refetchFn()
      
      
    };
  return (
    <div>useDeleteLesson</div>
  )
}

export default useDeleteLesson