import React, { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { UserCustomFormInterface } from '../../types/interfaces';

export interface SelectProps {
  selectName: keyof UserCustomFormInterface;
  register: UseFormRegister<UserCustomFormInterface>;
  selectOptions: string[];
  selectError: FieldError | undefined;
}
const SelectComponent: FC<SelectProps> = (props) => {
  const { selectName, register, selectOptions, selectError } = props;
  let labelName = `${selectName.match('eye') || selectName.match('hair')} ${
    selectName.match(/type/i) || selectName.match(/color/i)
  }`;
  if (labelName.includes('eye')) labelName = 'eyes color';
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
