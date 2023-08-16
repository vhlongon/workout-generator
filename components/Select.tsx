import React from 'react';

type SelectProps = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  id: string;
  name: string;
  options: { name: string; value: string }[];
  value: string;
};
export const Select = ({ onChange, id, name, options, value }: SelectProps) => {
  return (
    <select
      className="select select-sm select-bordered"
      onChange={onChange}
      name={name}
      id={id}
      value={value}
    >
      {options.map(option => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};
