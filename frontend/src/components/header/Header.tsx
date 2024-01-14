import React from "react";
import authAPI from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";

import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    const response = await authAPI.logout();
    
    if (response.status === "success") {
      dispatch(logout());
      navigate("/auth");
    }
  };  

  return (
    <div className="header">
      <div className="header__title">єТрекер🪙</div>
      <div className="header__button">
        <a className="header__link" onClick={handleLogout}>
          Вийти
        </a>
      </div>
    </div>
  );
};

export default Header;
