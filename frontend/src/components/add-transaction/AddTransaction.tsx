import React, { useState, useEffect } from "react";
import transactionsApi from "../../api/transactionsApi";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../store/slice/categoriesSlice";
import { setMessage, clearMessage } from "../../store/slice/messageSlice";

import "./AddTransaction.css";

const AddTransaction: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);
  const categories = useSelector((state: RootState) => state.categories.data);
  const { message, type: messageType } = useSelector((state: RootState) => state.message);

  const handleAddTransaction = async () => {
    dispatch(clearMessage());
  
    try {
      if (token) {
        const response = await transactionsApi.addTransaction(token, {
          title,
          description,
          amount,
          type,
          categoryId,
        });
  
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

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div className="add-transaction__container">
      <div className="add-transaction__title">
        Додавання транзакції
      </div>

      <div className="add-transaction__form">
        <div className="input">
          <label className="input__label">Назва транзакції</label>
          <input
            type="text"
            name="email"
            className="input__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input">
          <label className="input__label">Опис</label>
          <textarea
            name="description"
            className="input__input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="input">
          <label className="input__label">Сума</label>
          <input
            type="number"
            name="amount"
            className="input__input"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="input">
          <label className="input__label">Обирайте, будь ласка, вид</label>
          <select
            name="type"
            className="input__input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>Не обрано</option>
            <option value="income">Дохід</option>
            <option value="expense">Витрата</option>
          </select>
        </div>

        <div className="input">
          <label className="input__label">Обирайте, будь ласка, категорію</label>
          <select
            name="categoryId"
            className="input__input"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" disabled>Не обрано</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="add-transaction__buttons">
          <button
            className="button button--violet"
            disabled={!title.length || amount <= 0 || !type || !categoryId}
            onClick={handleAddTransaction}
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

export default AddTransaction;
