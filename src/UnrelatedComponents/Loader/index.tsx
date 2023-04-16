import React from 'react';
import './style.css';

const Loader = () => {
  return (
    <div className="loader__background">
      <div className="loader__wrapper">
        <h4 className="loader__title">LOADING...</h4>
        <div className="loader">
          <div className="loader__shadow"></div>
          <div className="loader__box"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
