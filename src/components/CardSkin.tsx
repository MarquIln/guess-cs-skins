'use client'
import { getAllSkins } from "@/services/services";
import { Input } from "./Input";
import { useEffect, useState } from "react";

type Skin = {
  name: string;
  image: string;
  price: number;
  weapon: string;
};

export function CardSkin() {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [guessCorrect, setGuessCorrect] = useState(false);
  const [currentSkinName, setCurrentSkinName] = useState("");

  useEffect(() => {
    getAllSkins().then((response) => {
      setSkins(response.data);
    });
  }, []);

  useEffect(() => {
    const indexOfFirstSkin = currentPage - 1;
    const currentIndex = indexOfFirstSkin >= 0 ? indexOfFirstSkin : 0;
    setCurrentSkinName(skins[currentIndex]?.name || "");
    console.log(skins[currentIndex]?.name)
  }, [currentPage, skins]);

  useEffect(() => {
    if (guessCorrect) {
      nextPage();
      setGuessCorrect(false);
    }
  }, [guessCorrect]);

  const indexOfFirstSkin = currentPage - 1;
  const currentSkins = skins.slice(indexOfFirstSkin, currentPage);

  function nextPage() {
    if (currentPage < Math.ceil(skins.length)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleGuessSubmit(guessSkin: string) {
    const currentIndex = currentPage - 1;
    const currentSkin = currentSkins[currentIndex];
    if (currentSkin?.name === guessSkin) {
      setGuessCorrect(true);
      console.log("Você acertou!");
    } else {
      setZoomLevel(zoomLevel - 0.5);
      console.log("Você errou!");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        {currentSkins.map((skin, index) => (
          <div key={index} className="mb-6" style={{ width: "100%", overflow: "hidden" }}>
            <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.5s ease", transformOrigin: "top left" }}>
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
  );
}
