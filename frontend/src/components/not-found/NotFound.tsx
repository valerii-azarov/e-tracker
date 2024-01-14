import React from "react";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">
          Сторінку не знайдено
        </h1>
        <p className="not-found__subtitle">
          Сторінка, яку ви шукаєте, має іншу адресу або видалена.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
