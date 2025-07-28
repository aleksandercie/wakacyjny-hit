import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const PriceInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  onBlur
}: {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  onBlur: () => void;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={id}
        className={`opacity-60 text-xs w-full block ${
          id === 'max-price' ? 'text-right' : 'text-left'
        }`}
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
          onBlur={onBlur}
          className="w-24 pl-8 z-1"
          id={id}
        />
        <span className="text-sm absolute top-2 left-4 z-0 opacity-60">zł</span>
      </div>
    </div>
  );
};
