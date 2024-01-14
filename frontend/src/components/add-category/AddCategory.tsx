import React, { useState } from "react";
import categoriesApi from "../../api/categoriesApi";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, clearMessage } from "../../store/slice/messageSlice";

import "./AddCategory.css";

const AddCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);
  const { message, type: messageType } = useSelector((state: RootState) => state.message);

  const handleAddCategory = async () => {
    dispatch(clearMessage());
  
    try {
      if (token) {
        const response = await categoriesApi.addCategory(token, { name });
  
        dispatch(setMessage({
          message: response.message,
          type: response.status,
        }));

        setTimeout(() => {
          dispatch(clearMessage());
        }, Math.floor(Math.random() * 10000) + 1000);
      }
    } catch (error) {
      dispatch(setMessage({
        message: (error as Error).message,
        type: "error",
      }));

      setTimeout(() => {
        dispatch(clearMessage());
      }, Math.floor(Math.random() * 5000) + 1000);
    }
  };

  return (
    <div className="add-category__container">
      <div className="add-category__title">
        Додавання категорії
      </div>

      <div className="add-category__form">
        <div className="input">
          <label className="input__label">Назва категорії</label>
          <input
            type="text"
            name="name"
            className="input__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="add-category__buttons">
          <button
            className="button button--violet"
            disabled={!name.length}
            onClick={handleAddCategory}
          >
            Додати
          </button>
        </div>

        {(message && messageType) && (
          <div className={`message message--${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
