import React from 'react';

interface NumberInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, placeholder = "0.0", disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits and only one dot
    if (/^\d*\.?\d*$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-transparent text-3xl sm:text-4xl font-bold text-gray-800 placeholder-gray-300 outline-none text-right disabled:text-gray-500 transition-colors"
    />
  );
};

export default NumberInput;
