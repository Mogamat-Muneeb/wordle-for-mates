import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context";

function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="z-[1000]">
      {user ? (
        <>
          <p>User Email: {user.email}</p>
          <button onClick={handleLogout} className="px-6 py-2 my-4 border">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/auth">SignUp</Link>
        </>
      )}

      <h1 className="z-[1000] font-extrabold text-[30px] p-1 bg-white text-[#212529] border-b-[1px] border-[#eee] w-full fixed right-0 left-0">
        {pathName === "/wordle-single" ? (
          <>
            <span className="text-[#5ac85a]">Wordle</span>
          </>
        ) : (
          <>
            <span className="text-[#5ac85a]">Wordle</span> for mates!
          </>
        )}
      </h1>
    </div>
  );
}

export default Header;
