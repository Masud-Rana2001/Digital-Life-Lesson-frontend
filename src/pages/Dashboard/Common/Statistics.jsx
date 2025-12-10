import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import UserStatistics from '../../../components/Dashboard/Statistics/UserStatistics';
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const { role } = useRole();
  console.log(role)
  return (
    <div>
      
      {role === "admin" && <AdminStatistics />}
      {role === "user" && <UserStatistics/>}
    </div>
  )
}

export default Statistics
