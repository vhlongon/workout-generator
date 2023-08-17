import { formatOptions } from '@/helpers/format';
import { CustomSelectProps } from '@/types';
import { Mode } from '@prisma/client';
import { Select } from './Select';

export const ModeSelect = ({ onChange, value }: CustomSelectProps) => {
  return (
    <div className="form-control">
      <label className="label text-sm text text-gray-400" htmlFor="target">
        Mode
      </label>
      <Select
        onChange={onChange}
        name="mode"
        id="mode"
        value={value}
        options={formatOptions(Mode)}
      ></Select>
    </div>
  );
};
