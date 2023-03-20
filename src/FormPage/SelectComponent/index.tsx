import React, { ChangeEvent } from 'react';
import { Component, ReactNode } from 'react';

export interface SelectProps {
  selectName: string;
  selectOptions: string[];
}

export default class SelectComponent extends Component<SelectProps> {
  value: string;
  constructor(props: SelectProps) {
    super(props);
    this.value = this.props.selectOptions[0];
  }
  handleSelectedOption(e: ChangeEvent<HTMLSelectElement>) {
    const opt = e.target as HTMLSelectElement;
    this.value = opt.value;
  }
  render(): ReactNode {
    const { selectName, selectOptions } = this.props;
    const labelName = `${selectName.match('eye') || selectName.match('hair')} ${
      selectName.match(/type/i) || selectName.match(/color/i)
    }`;
    return (
      <label>
        {`Choose the ${labelName.toLowerCase()}`}
        <select
          name={selectName}
          id={`${selectName}-select`}
          onChange={this.handleSelectedOption.bind(this)}
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
}
