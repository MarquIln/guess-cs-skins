'use client'
import { getAllSkins } from "@/services/services"
import { useEffect, useState } from "react"
import { Input } from "./Input"

type Skin = {
  name: string
  image: string
  price: number
  weapon: string
}

export function CardSkin() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(5)
  const [guessCorrect, setGuessCorrect] = useState(false)
  const [currentSkinName, setCurrentSkinName] = useState("")
  const [minZoomLevel] = useState(1)

  const indexOfFirstSkin = currentPage - 1
  const currentSkins = skins.slice(indexOfFirstSkin, currentPage)

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
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleGuessSubmit(guessSkin: string) {
    const currentSkin = skins[currentPage - 1]
    const skinNameParts = currentSkin?.name.split('|')

    if (skinNameParts && skinNameParts.length === 2) {
      const correctGuess = skinNameParts[1].trim().toLocaleLowerCase()
      guessSkin = guessSkin.trim().toLocaleLowerCase()

      if (correctGuess === guessSkin) {
        setGuessCorrect(true)
        console.log("Você acertou!")
      } else {
        console.log(correctGuess, guessSkin)
        const newZoomLevel = zoomLevel - 0.2
        setZoomLevel(newZoomLevel < minZoomLevel ? minZoomLevel : newZoomLevel)
        console.log("Você errou!")
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        {currentSkins.map((skin, index) => (
          <div key={index} className="mb-6" style={{ width: "100%", overflow: "hidden" }}>
            <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.5s ease" }}>
              <img src={skin.image} alt="A imagem não carregou." className="rounded-lg shadow-md" style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.5s ease" }} />
            </div>
            <p className="mt-2">Name: {currentSkinName}</p>
          </div>
        ))}
        <div>
          <Input onSubmit={handleGuessSubmit} />
          <div className="flex justify-between mt-4">
            <button onClick={prevPage} disabled={currentPage === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Previous
            </button>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(skins.length)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
