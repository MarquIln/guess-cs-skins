'use client'
import { getAllSkins } from "@/services/services"
import { Skin } from "@/types/ISkin"
import { useEffect, useState } from "react"
import { Input } from "./Input"

export function CardSkin() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [blurLevel, setBlurLevel] = useState(50)
  const [guessCorrect, setGuessCorrect] = useState(false)
  const [currentSkinName, setCurrentSkinName] = useState("")
  const [minBlurLevel] = useState(0)

  const skinIndex = currentPage - 1
  const currentSkins = skins.slice(skinIndex, currentPage)

  useEffect(() => {
    getAllSkins().then((response) => {
      const shuffledSkins = shuffleArray(response.data)
      setSkins(shuffledSkins)
    })
  }, [])

  useEffect(() => {
    const currentSkin = skins[currentPage - 1]
    setCurrentSkinName(currentSkin?.name || "")
  }, [currentPage, skins])

  useEffect(() => {
    if (guessCorrect) {
      nextPage()
      setGuessCorrect(false)
    }
  }, [guessCorrect])

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  function nextPage() {
    if (currentPage < Math.ceil(skins.length)) {
      setCurrentPage(currentPage + 1)
      setBlurLevel(50)
    }
  }

  function handleGuessSubmit(guessSkin: string) {
    const currentSkin = skins[currentPage - 1];

    if (currentSkin) {
      const correctGuess = currentSkin.pattern.name.trim().toLowerCase();
      guessSkin = guessSkin.trim().toLowerCase();

      if (correctGuess === guessSkin) {
        setGuessCorrect(true);
        console.log("Você acertou!");
      } else {
        const newBlurLevel = blurLevel - 5 > minBlurLevel ? blurLevel - 5 : minBlurLevel;
        setBlurLevel(newBlurLevel);
        console.log("Você errou!");
      }
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        {currentSkins.map((skin, index) => (
          <div key={index} className="mb-6" style={{ width: "100%", overflow: "hidden" }}>
            <div style={{ filter: `blur(${blurLevel}px)`, transition: "filter 0.5s ease" }}>
              <img src={skin.image} alt="A imagem não carregou." className="rounded-lg shadow-md" />
            </div>
            <p className="mt-2">Name: {currentSkinName}</p>
          </div>
        ))}
        <div>
          <Input onSubmit={handleGuessSubmit} />
        </div>
      </div>
    </div>
  )
}
