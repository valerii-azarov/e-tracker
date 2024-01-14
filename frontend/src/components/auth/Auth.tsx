import React, { useState, useEffect } from "react";
import authAPI from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../store/slice/authSlice";
import { setMessage, clearMessage } from "../../store/slice/messageSlice";

import "./Auth.css";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { message, type } = useSelector((state: RootState) => state.message);

  const handleAuth = async () => {
    dispatch(clearMessage());
  
    try {
      isLogin ? await handleLogin() : await handleRegistration();
    } catch (error) {
      dispatch(setMessage({
        message: (error as Error).message,
        type: "error",
      }));
    }
  };
  
  const handleLogin = async () => {
    const response = await authAPI.login({ email, password });
  
    dispatch(setMessage({
      message: response.message,
      type: response.status,
    }));
  
    setTimeout(() => {
      if (response.status === "success") {
        dispatch(login());
        navigate("/home");
      }
    }, Math.floor(Math.random() * 5000) + 1000);
  };
   
  const handleRegistration = async () => {
    const response = await authAPI.register({ surname, name, email, password });
    
    dispatch(register());

    dispatch(setMessage({
      message: response.message,
      type: response.status,
    }));
  };
  
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__title">
          {isLogin ? "Вхід" : "Реєстрація"}
        </div>

        <div className="auth__form">
          {!isLogin && (
            <React.Fragment>
              <div className="input">
                <label className="input__label">Прізвище</label>
                <input
                  type="text"
                  name="surname"
                  className="input__input"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>

              <div className="input">
                <label className="input__label">Ім'я</label>
                <input
                  type="text"
                  name="name"
                  className="input__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </React.Fragment>
          )}

          <div className="input">
            <label className="input__label">Електронна пошта</label>
            <input
              type="text"
              name="email"
              className="input__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <label className="input__label">Пароль</label>
            <input
              type="password"
              name="password"
              className="input__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth__buttons">
            <button
              className="button button--violet"
              disabled={!email.length || !password.length || (!isLogin && (!surname.length || !name.length))}
              onClick={handleAuth}
            >
              {isLogin ? "Увійти" : "Зареєструватися"}
            </button>

            <button 
              className="button button--indigo" 
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Зареєструватися" : "Увійти"}
            </button>
          </div>

          {(message && type) && (
            <div className={`message message--${type}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
