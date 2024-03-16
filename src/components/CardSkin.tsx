'use client'
import { Skin } from "@/types/ISkin"
import { CardSkinProps } from "@/types/ISkinCard"
import { useEffect, useState } from "react";

export function CardSkin({ skins, page, blurLevel }: CardSkinProps) {
  const [currentSkin, setCurrentSkin] = useState<Skin>()
  useEffect(() => {
    setCurrentSkin(skins[page - 1])
  }, [page, skins])

  return (
    <div className="flex justify-center">
      <div className="bg-gray-900 rounded-lg">
        <div>
          <img
            src={currentSkin?.image}
            style={{ filter: `blur(${blurLevel}px)`, transition: "filter 0.5s" }}
            alt={currentSkin ? currentSkin.name : "A imagem não carregou."}
          />
        </div>
      </div>
    </div>
  );
}
