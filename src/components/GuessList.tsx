import React from 'react';

interface GuessListProps {
  guesses: string[]
  isListOpen: boolean
  onGuessClick: (guess: string) => void
}

export function GuessList({ guesses, isListOpen, onGuessClick }: GuessListProps) {
  return (
    <ul className={`mt-2 space-y-2 ${isListOpen ? '' : 'hidden'}`}>
      {guesses.map((guess, index) => (
        <li key={index} className="w-full text-white">
          <button className="bg-blue-600 p-2 rounded" onClick={() => onGuessClick(guess)}>
            {guess}
          </button>
        </li>
      ))}
    </ul>
  );
}
