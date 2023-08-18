import { formatOptions } from '@/helpers/format';
import { CustomSelectProps } from '@/types';
import { Target } from '@prisma/client';
import { Select } from './Select';

export const TargetSelect = ({ defaultValue }: CustomSelectProps) => {
  return (
    <div className="form-control">
      <label className="label text-sm text text-gray-400" htmlFor="target">
        Target
      </label>
      <Select
        name="target"
        id="target"
        defaultValue={defaultValue}
        options={formatOptions(Target)}
      ></Select>
    </div>
  );
};
