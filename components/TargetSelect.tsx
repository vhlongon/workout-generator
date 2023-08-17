import { formatOptions } from '@/helpers/format';
import { CustomSelectProps } from '@/types';
import { Target } from '@prisma/client';
import { Select } from './Select';

export const TargetSelect = ({ onChange, value }: CustomSelectProps) => {
  return (
    <div className="form-control">
      <label className="label text-sm text text-gray-400" htmlFor="target">
        Target
      </label>
      <Select
        onChange={onChange}
        name="target"
        id="target"
        value={value}
        options={formatOptions(Target)}
      ></Select>
    </div>
  );
};
