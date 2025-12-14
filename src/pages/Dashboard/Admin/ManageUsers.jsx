import UserDataRow from './UserDataRow'
import { FaBook, FaHome, FaUserTie } from "react-icons/fa";
const ManageUsers = () => {
  return (
    <>
      <div className='w-full px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>

            <h1 className="text-3xl font-bold mb-8 flex gap-5 text-primary">
              <FaUserTie/>
              Manage All User</h1>
            <div className="relative -mx-4 md:mx-0 overflow-x-auto bg-white rounded-xl shadow">
  <table className="table table-zebra min-w-[1000px] w-full">
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal whitespace-nowrap"
        >
          Name
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal whitespace-nowrap"
        >
          Email
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal whitespace-nowrap"
        >
          Role
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal whitespace-nowrap"
        >
          Total Created Lessons
        </th>

        <th
          scope="col"
          className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal whitespace-nowrap"
        >
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      <UserDataRow />
    </tbody>
  </table>
</div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers
