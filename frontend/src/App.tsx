import React, { useEffect } from "react";
import authAPI from "./api/authApi";
import { Route, Routes } from "react-router-dom";
import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./store/slice/authSlice";

import Auth from "./components/auth/Auth";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import NotFound from "./components/not-found/NotFound";

import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const firstLogin = localStorage.getItem("firstLogin");

  useEffect(() => {
    (async () => {
      const accessToken = await authAPI.refreshToken();
      firstLogin === "true" && dispatch(refreshToken(accessToken));
    })();
  }, [firstLogin, dispatch]);

  return (
    <div className="container">
      {isAuth ? (
        <>
          <Header />
          <Routes>
            <Route path="/home/*" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
