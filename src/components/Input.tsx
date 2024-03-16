import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { getAllSkins } from '@/services/services';

interface InputProps {
  onSubmit: (response: string) => void;
}

export function Input({ onSubmit }: InputProps) {
  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 300)
  const [guesses, setGuesses] = useState<string[]>([])

  useEffect(() => {
    if (debouncedInputValue) {
      fetchGuessesFromAPI(debouncedInputValue)
    } else {
      setGuesses([])
    }
  }, [debouncedInputValue])

  function fetchGuessesFromAPI(query: string) {
    getAllSkins()
      .then((response) => {
        const skins = response.data
        const matchingGuesses = skins.filter((skin: any) =>
          skin.pattern && skin.pattern.name && skin.pattern.name.toLowerCase().includes(query.toLowerCase())
        )
        setGuesses(matchingGuesses.map((skin: any) => skin.pattern.name))
      })
      .catch((error) => {
        console.error('Erro ao buscar as opções:', error)
        setGuesses([])
      })
  }


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(inputValue)
    setInputValue('')
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
      <ul className="mt-2 space-y-2">
        {guesses.map((guess, index) => (
          <li key={index} className="bg-blue-600 p-2 rounded">{guess}</li>
        ))}
      </ul>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
        Chutar
      </button>
    </form>
  );
}
