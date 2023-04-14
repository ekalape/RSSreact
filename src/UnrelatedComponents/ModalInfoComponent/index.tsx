import React, { FC } from 'react';
import './style.css';

const ModalInfoComponent: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="modalInfo__bg">
      <div className="modalInfo__frame">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ModalInfoComponent;
