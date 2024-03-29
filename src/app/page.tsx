'use client'
import { Button } from '@/components/Button'
import { CardSkin } from '@/components/CardSkin'
import { Header } from '@/components/Header'
import { Hints } from '@/components/Hints'
import { InputContainer } from '@/components/InputContainer'
import { ResponseList } from '@/components/ResponseList'
import { getAllSkins } from '@/services/services'
import { Skin } from '@/types/ISkin'
import { useEffect, useState } from 'react'

export default function Home() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [blurLevel, setBlurLevel] = useState(40)
  const minBlurLevel = 0
  const [answers, setanswers] = useState<Skin[]>([])
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null)
  const [correctGuess, setCorrectGuess] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const currentSkin = skins[currentPage - 1]

  useEffect(() => {
    getAllSkins().then((response) => {
      const shuffledSkins = shuffleArray(response.data)
      setSkins(shuffledSkins)
    })
  }, [])

  function nextPage() {
    if (currentPage < Math.ceil(skins.length)) {
      setCurrentPage(currentPage + 1)
      setBlurLevel(50)
      setCorrectGuess(false)
      setanswers([])
    }
  }

  function handleGuessSubmit(guessSkin: Skin) {
    if (currentSkin) {
      let correctGuess =
        currentSkin.weapon.name.trim() +
        ' | ' +
        (currentSkin.pattern ? currentSkin.pattern.name.trim() : '') +
        (currentSkin.phase ? ' ' + currentSkin.phase.trim() : '')

      let cleanedGuess = guessSkin.name.replace('★', '')
      if (guessSkin.phase) {
        cleanedGuess += ' ' + guessSkin.phase.trim()
      }

      correctGuess = correctGuess.replace(/\s+/g, '')
      cleanedGuess = cleanedGuess.replace(/\s+/g, '')

      if (correctGuess === cleanedGuess) {
        setCorrectGuess(true)
        setBlurLevel(0)
        setTimeout(() => {
          nextPage()
        }, 1000)
      } else {
        const newBlurLevel =
          blurLevel - 10 > minBlurLevel ? blurLevel - 10 : minBlurLevel
        setBlurLevel(newBlurLevel)
        setanswers((prevAnswers) => [...prevAnswers, guessSkin])
        setSelectedSkin(currentSkin)
      }
    }
  }

  function toggleHints() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  function shuffleArray(array: never[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    <div className="h-screen bg-gray-700">
      <Header name="Advinhe a skin do dia!" />
      <div>
        <CardSkin skins={skins} page={currentPage} blurLevel={blurLevel} />
        <div className="flex justify-center">
          <InputContainer onSubmit={handleGuessSubmit} />
        </div>
        <div className="flex justify-center">
          <ResponseList answers={answers} selectedSkin={selectedSkin} />
        </div>
      </div>
      <div className="flex justify-center py-10">
        {isOpen ? (
          <Hints isOpen={isOpen} skin={currentSkin} />
        ) : (
          <Button content={'Hints!'} onClick={toggleHints} />
        )}
      </div>
      {correctGuess && (
        <div
          className="absolute inset-0 bg-black opacity-0"
          style={{ transition: 'opacity 5s' }}
        />
      )}
    </div>
  )
}
