import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthenticate } from "../helpers/authenticate";

export default function AuthLayout() {
  const {isAccessTokenValid,getNewAccessToken} = useAuthenticate()
  useEffect(() => {
    if(!isAccessTokenValid()){
      getNewAccessToken()
    }
  },[isAccessTokenValid,getNewAccessToken])


  if (isAccessTokenValid()) {
    return <Navigate to="/" />
  } else {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">

        <Outlet />
      </div>
    )
  }


}
