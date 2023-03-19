import Form from '../Form';
import React from 'react';
import './style.css';

export default class FormPage extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="formsPage__wrapper" role={'forms-page'}>
        <Form />
        <div className="formsResult-container">{/* map */}</div>
      </div>
    );
  }
}
