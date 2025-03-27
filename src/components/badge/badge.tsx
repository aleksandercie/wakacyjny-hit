export const Badge = ({
  quantity,
  className
}: {
  quantity: number;
  className?: string;
}) => {
  return (
    <span
      className={`absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full ${className}`}
    >
      {quantity}
    </span>
  );
};
