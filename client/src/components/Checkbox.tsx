interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

const Checkbox = ({
  checked,
  onChange,
  label,
  className = ''
}: CheckboxProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="sr-only"
        />
        <div
          className={`
            w-4.5 h-4.5 border-2 rounded-md transition-all duration-200 flex items-center justify-center flex-shrink-0
            ${checked
              ? 'bg-primary border-primary dark:bg-[#B794F6] dark:border-[#B794F6]'
              : 'bg-transparent border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-[#B794F6]'
            }
          `}
        >
          <svg
            className={`w-3.5 h-3.5 ${checked
              ? 'opacity-100 text-white transition-opacity duration-300'
              : 'opacity-0 text-white transition-all duration-300'
              }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {label && (
        <span className="text-gray-700 text-sm dark:text-gray-300 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;