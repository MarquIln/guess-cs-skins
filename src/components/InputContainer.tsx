import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { getAllSkins } from '@/services/services'
import { Input } from './Input'
import { GuessList } from './GuessList'

interface InputContainerProps {
  onSubmit: (response: string) => void
}

export function InputContainer({ onSubmit }: InputContainerProps) {
  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 300)
  const [guesses, setGuesses] = useState<string[]>([])
  const [isGuessListOpen, setIsGuessListOpen] = useState(false) 

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
          skin.pattern && skin.pattern.name && skin.weapon && skin.weapon.name &&
          (skin.weapon.name.trim().toLowerCase() + " " + skin.pattern.name.trim().toLowerCase()).includes(query.toLowerCase())
        )
        setGuesses(matchingGuesses.map((skin: any) => {
          const correctGuess = skin.weapon.name.trim() + " " + skin.pattern.name.trim()
          return correctGuess.charAt(0).toUpperCase() + correctGuess.slice(1)
        }))
        setIsGuessListOpen(true) 
      })
      .catch((error) => {
        console.error('Erro ao buscar as opções:', error)
        setGuesses([])
        setIsGuessListOpen(false) 
      })
  }

  function handleInputChange(value: string) {
    setInputValue(value)
  }

  function handleSubmit() {
    onSubmit(inputValue)
    setInputValue('')
    setIsGuessListOpen(false) 
  }

  function handleGuessClick(guess: string) {
    onSubmit(guess)
    setInputValue('')
    setIsGuessListOpen(false) 
  }

  return (
    <div>
      <Input value={inputValue} onChange={handleInputChange} onSubmit={handleSubmit} />
      <GuessList guesses={guesses} isListOpen={isGuessListOpen} onGuessClick={handleGuessClick} />
    </div>
  )
}
