'use client'

import { CardSkin } from "@/components/CardSkin"
import { Header } from "@/components/Header"
import { InputContainer } from "@/components/InputContainer"
import { getAllSkins } from "@/services/services"
import { Skin } from "@/types/ISkin"
import { useEffect, useState } from "react"

export default function Home() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [blurLevel, setBlurLevel] = useState(50)
  const [guessCorrect, setGuessCorrect] = useState(false)
  const minBlurLevel = 0

  useEffect(() => {
    getAllSkins().then((response) => {
      const shuffledSkins = shuffleArray(response.data)
      setSkins(shuffledSkins)
    })
  }, [])

  useEffect(() => {
    if (guessCorrect) {
      nextPage()
      setGuessCorrect(false)
    }
  }, [guessCorrect])

  function nextPage() {
    if (currentPage < Math.ceil(skins.length)) {
      setCurrentPage(currentPage + 1)
      setBlurLevel(50)
    }
  }

  function handleGuessSubmit(guessSkin: string) {
    const currentSkin = skins[currentPage - 1]
    if (currentSkin) {
      const correctGuess = currentSkin.weapon.name.trim().toLowerCase() + " " + currentSkin.pattern.name.trim().toLowerCase()
      guessSkin = guessSkin.trim().toLowerCase()
      if (correctGuess === guessSkin) {
        setGuessCorrect(true)
        nextPage()
      } else {
        const newBlurLevel = blurLevel - 7 > minBlurLevel ? blurLevel - 7 : minBlurLevel
        setBlurLevel(newBlurLevel)
      }
    }
  }

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    <div className="bg-gray-700 h-screen">
      <Header name="Advinhe a skin do dia!" />
      <div>
        <CardSkin
          skins={skins}
          page={currentPage}
          blurLevel={blurLevel}
        />
        <div className="justify-center flex">
          <InputContainer onSubmit={handleGuessSubmit} />
        </div>
      </div>
    </div>
  );
}
