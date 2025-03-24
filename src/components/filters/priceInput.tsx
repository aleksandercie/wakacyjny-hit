import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const PriceInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max
}: {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={id}
        className="opacity-40 text-xs text-center w-full block"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          type="text"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className="w-24 pl-8 z-1"
          id={id}
          disabled
        />
        <span className="text-sm absolute top-2 left-4 z-0">zł</span>
      </div>
    </div>
  );
};
