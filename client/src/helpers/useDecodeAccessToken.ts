import { jwtDecode } from "jwt-decode";
import type { RootState } from "../app/store"
import { useSelector } from "react-redux";
import type { JwtAccessTokenPayload } from "../api/responseType";

export const useDecodeAccessToken = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    if(!accessToken){
        return {role:null}
    }
    const decoded = jwtDecode(accessToken) as JwtAccessTokenPayload
    return {
        id:decoded.userId,
        name:decoded.name,
        email:decoded.email,
    }
}