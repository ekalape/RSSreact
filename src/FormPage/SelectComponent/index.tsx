import React from 'react';
import { Component, ReactNode } from 'react';

export interface SelectProps {
  selectName: string;
  reference: React.RefObject<HTMLSelectElement>;
  selectOptions: string[];
  selectError: string;
}

export default class SelectComponent extends Component<SelectProps> {
  render(): ReactNode {
    const { selectName, reference, selectOptions, selectError } = this.props;
    const labelName = `${selectName.match('eyes') || selectName.match('hair')} ${
      selectName.match(/type/i) || selectName.match(/color/i)
    }`;

    return (
      <label>
        {`Choose the ${labelName.toLowerCase()}`}
        <select name={selectName} id={`${selectName}-select`} ref={reference}>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {selectError && <p>{selectError}</p>}
      </label>
    );
  }
}
