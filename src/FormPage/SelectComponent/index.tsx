import React, { FC } from 'react';
import { SelectProps } from '../../types/interfaces';

const SelectComponent: FC<SelectProps> = (props) => {
  const { selectName, register, selectOptions, selectError } = props;
  /*   let labelName = `${selectName.match('eye') || selectName.match('hair')} ${
    selectName.match(/type/i) || selectName.match(/color/i)
  }`;
  if (labelName.includes('eye')) labelName = 'eyes color'; */
  const labelName = `${
    (selectName.match('eye') && selectName.replace('eye', 'First ')) ||
    (selectName.match('hair') && selectName.replace('hair', 'Second ')) ||
    selectName
  }`;
  return (
    <label>
      {`Choose the ${labelName.toLowerCase()}`}
      <select
        {...register(selectName, {
          pattern: {
            value: /[^-]/,
            message: `${
              labelName.at(0)?.toUpperCase() + labelName.slice(1).toLowerCase()
            } is required`,
          },
        })}
        style={{
          backgroundColor: selectError ? 'mistyrose' : undefined,
          borderColor: selectError ? 'darkred' : undefined,
        }}
      >
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectError && <p>{selectError?.message}</p>}
    </label>
  );
};

export default SelectComponent;
