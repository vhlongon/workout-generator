type SelectProps = {
  id: string;
  name: string;
  options: { name: string; value: string }[];
  defaultValue: string;
};

export const Select = ({ id, name, options, defaultValue }: SelectProps) => {
  return (
    <select
      className="select select-sm select-bordered"
      name={name}
      id={id}
      defaultValue={defaultValue}
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
