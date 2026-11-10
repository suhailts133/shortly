import { Link2, LogIn, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logOut } from "../app/authSlice";
import { useDecodeAccessToken } from "../helpers/useDecodeAccessToken";

const BRAND_NAME = "Shortly";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!accessToken;
  const { name } = useDecodeAccessToken();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-bg-raised/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-text-on-accent transition-transform duration-200 group-hover:rotate-6">
            <Link2 size={17} />
          </span>
          <span className="font-Dynalight-Regular text-3xl leading-none text-accent">
            {BRAND_NAME}
          </span>
        </NavLink>

        {isLoggedIn ? (
          <div className="flex items-center gap-2 rounded-full border border-surface-border bg-surface p-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-sm font-semibold text-accent-tint-text">
              {name && name[0].toUpperCase()}
            </div>
            <span className="hidden max-w-24 truncate text-sm font-medium text-text-primary sm:block">
              {name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              title="Log out"
              aria-label="Log out"
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-error-tint hover:text-error"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <NavLink
            to="/auth/login"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-text-on-accent transition-colors duration-200 hover:bg-accent-hover"
          >
            <LogIn size={15} />
            Sign in
          </NavLink>
        )}
      </div>
    </header>
  );
}