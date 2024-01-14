import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/uk";
import transactionsApi from "../../api/transactionsApi";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { loadTransactions } from "../../store/slice/transactionsSlice";
import { Record } from "../../interfaces/transaction-interface";
import DeleteTransaction from "../delete-transaction/DeleteTransaction";

import "./Transactions.css";

const Transactions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [transactionToDelete, setTransactionToDelete] = useState<Record | null>(null);
  const [callback, setCallback] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);
  const transactions = useSelector((state: RootState) => state.transactions.data);

  const handleDeleteTransaction = async () => {
    if (transactionToDelete && token) {
      await transactionsApi.deleteTransaction(token, transactionToDelete._id);
      setTransactionToDelete(null);
      setCallback(!callback);
    }
  };

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch, callback]);

  return (
    <div className="transactions__container">
      <div className="transactions__title">Історія транзакцій</div>

      <div className="transactions__list">
        {Object.keys(transactions).length > 0 ? (
          Object.keys(transactions).map((date) => (
            <div key={date}>
              <div className="transactions__list-date">
                {moment(date, "DD.MM.YYYY").format("DD MMMM YYYY [року]")}
              </div>

              {transactions[date].map((transaction) => (
                <div key={transaction._id} className={`transaction__card ${transaction.type}`}>
                  <div className="transaction__card-inner">
                    <div className="transaction__card-left">
                      <div className="transaction__card-title">
                        <h2>{transaction.title}</h2>
                        <p>{transaction.categoryId.name}</p>
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => setTransactionToDelete(transaction)}
                        />
                      </div>

                      <div className="transaction__card-description">
                        <p>{transaction.description}</p>
                      </div>
                    </div>

                    <div className="transaction__card-right">
                      <div className="transaction__card-amount">
                        <p>{`${transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)} UAN`}</p>
                      </div>

                      <div className="transaction__card-date">
                        <p>{`Дата створення транзакції: ${moment(transaction.date).format("HH:mm:ss")}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>
            На жаль, на даний момент відсутня будь-яка історія транзакцій.
          </div>
        )}
      </div>

      {transactionToDelete && (
        <DeleteTransaction
          onDeleteClick={handleDeleteTransaction}
          onCancelClick={() => setTransactionToDelete(null)}
        />
      )}
    </div>
  );
};

export default Transactions;
