import React from 'react'
import { Button } from './Button'
import { Skin } from '@/types/ISkin'

interface GuessListProps {
  guesses: Skin[]
  isListOpen: boolean
  onGuessClick: (guess: Skin) => void
}

export function GuessList({
  guesses,
  isListOpen,
  onGuessClick,
}: GuessListProps) {
  return (
    <ul
      className={`mt-2 space-y-2 ${isListOpen ? 'max-h-40 overflow-y-auto' : 'hidden'}`}
    >
      {guesses.map((guess, index) => (
        <li key={index} className="w-full text-white">
          <Button onClick={() => onGuessClick(guess)} content={guess} />
        </li>
      ))}
    </ul>
  )
}
