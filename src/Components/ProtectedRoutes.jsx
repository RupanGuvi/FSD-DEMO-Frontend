import NotFound from "../Pages/NotFound";


export const ProtectedRoutes = ({children,adminOnly = false})=>{
   const token = localStorage.getItem("token");
   const userRole = localStorage.getItem('role');
   if(!token){
    return <Navigate to="/login"/>
   }
   if (adminOnly && userRole !== "admin") {
    return <NotFound />
  }
  return children
}