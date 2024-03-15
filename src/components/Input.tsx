import React, { useState } from 'react';

type InputProps = {
  onSubmit: (response: string) => void;
};

export function Input({ onSubmit }: InputProps) {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Chute qual skin você acha que é: "
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-400 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        style={{ width: '80%' }}
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
        Chutar
      </button>
    </form>
  );
}
