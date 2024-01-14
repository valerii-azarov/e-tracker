import React from "react";
import "./DeleteTransaction.css";

interface DeleteTransactionProps {
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

const DeleteTransaction: React.FC<DeleteTransactionProps> = ({ onDeleteClick, onCancelClick }) => {
  return (
    <div className="delete-transaction">
      <div className="delete-transaction__container">
        <div className="delete-transaction__title">
          Ви хочете видалити транзакцію?
        </div>

        <div className="delete-transaction__hint">
          <p>Після видалення транзакції, вона буде безповоротно видалена з базі даних.</p>
          <p>Будьте впевнені, що ви хочете видалити цю транзакцію.</p>
        </div>

        <div className="delete-transaction__buttons">
          <button className="button button--violet" onClick={onDeleteClick}>
            Видалити
          </button>

          <button className="button button--secondary" style={{ margin: 0 }}onClick={onCancelClick}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransaction;
