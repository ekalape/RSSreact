import React from 'react';
import { Component, ReactNode } from 'react';

export interface InputComponentProps {
  name: string;
  type: string;
  error: string;
  reference: React.RefObject<HTMLInputElement>;
  options?: {
    [key: string]: string;
  };
}

export default class InputComponent extends Component<InputComponentProps> {
  render(): ReactNode {
    const { name, type, error, reference } = this.props;
    const dateMax = this.props.options?.max;
    const acceptRes = this.props.options?.accept;
    return (
      <label>
        {`Enter the ${name.includes('Input') ? name.replace('Input', '') : name}`}
        <input
          type={type}
          name={name}
          ref={reference}
          placeholder={name}
          max={dateMax && dateMax}
          accept={acceptRes && acceptRes}
          style={{ borderColor: error ? 'red' : undefined }}
        />
        {error && <p>{error}</p>}
      </label>
    );
  }
}
