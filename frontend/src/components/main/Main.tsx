import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Balance from "../../components/balance/Balance";
import Transactions from "../../components/transactions/Transactions";
import AddTransaction from "../../components/add-transaction/AddTransaction";
import AddCategory from "../add-category/AddCategory";

import "./Main.css";

const tabs = [
  { id: "balance", label: "Ваш баланс", component: <Balance /> },
  { id: "transactions", label: "Транзакції", component: <Transactions /> },
  { id: "add-transaction", label: "Додати транзакцію", component: <AddTransaction /> },
  { id: "add-category", label: "Додати категорію", component: <AddCategory /> },
];

const Main: React.FC = () => {
  return (
    <div className="main">
      <div className="main__container">
        <div className="main__title">
          👋 Привіт, тут можна переглядати та додавати транзакції та тощо.
        </div>

        <div className="main__cards">
          {tabs.map(tab => (
            <Link key={tab.id} to={`/home/${tab.id}`} className="card">
              <div className="card__inner">
                <p>{tab.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="main__content">
          <Routes>
            {tabs.map(tab => (
              <Route key={tab.id} path={`/${tab.id}`} element={tab.component} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Main;
