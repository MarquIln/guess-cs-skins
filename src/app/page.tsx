'use client'
import { CardSkin } from "@/components/CardSkin"
import { Header } from "@/components/Header"
import { InputContainer } from "@/components/InputContainer"
import { ResponseList } from "@/components/ResponseList"
import { getAllSkins } from "@/services/services"
import { Skin } from "@/types/ISkin"
import { useEffect, useState } from "react"

export default function Home() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [blurLevel, setBlurLevel] = useState(50)
  const minBlurLevel = 0
  const [responses, setResponses] = useState<string[]>([])
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null)
  const [correctGuess, setCorrectGuess] = useState<boolean>(false)

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
    }
  }

  function handleGuessSubmit(guessSkin: string) {
    const currentSkin = skins[currentPage - 1]
    if (currentSkin) {
      const correctGuess =
        currentSkin.weapon.name.trim() +
        " " +
        (currentSkin.pattern ? currentSkin.pattern.name.trim() : "") +
        (currentSkin.phase ? " " + currentSkin.phase.trim() : "")
      guessSkin = guessSkin.trim()
      if (correctGuess === guessSkin) {
        setCorrectGuess(true)
        setBlurLevel(0)
        setTimeout(() => {
          nextPage()
          setResponses([])
        }, 2000)
      } else {
        const newBlurLevel = blurLevel - 10 > minBlurLevel ? blurLevel - 10 : minBlurLevel
        setBlurLevel(newBlurLevel)
        setResponses([...responses, guessSkin])
        setSelectedSkin(guessSkin)
        console.log('Resposta certa era: ' + correctGuess)
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
        <CardSkin skins={skins} page={currentPage} blurLevel={blurLevel} />
        <div className="justify-center flex">
          <InputContainer onSubmit={handleGuessSubmit} />
        </div>
        <div className="justify-center flex">
          <ResponseList responses={responses} selectedSkin={selectedSkin} />
        </div>
      </div>
      {correctGuess && <div className="absolute inset-0 bg-black opacity-0" style={{ transition: "opacity 5s" }} />}
    </div>
  )
}
