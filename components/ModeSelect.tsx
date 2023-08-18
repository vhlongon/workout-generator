import { formatOptions } from '@/helpers/format';
import { CustomSelectProps } from '@/types';
import { Mode } from '@prisma/client';
import { Select } from './Select';

export const ModeSelect = ({ defaultValue }: CustomSelectProps) => {
  return (
    <div className="form-control">
      <label className="label text-sm text text-gray-400" htmlFor="target">
        Mode
      </label>
      <Select
        name="mode"
        id="mode"
        defaultValue={defaultValue}
        options={formatOptions(Mode)}
      ></Select>
    </div>
  );
};
