'use client'
import { getAllSkins } from "@/services/services";
import { useEffect, useState } from "react";

type Skin = {
  name: string
  image: string
  price: number
  weapon: string
  pattern: string
  souvenir: string
}

export function CardSkin() {
  const [skins, setSkins] = useState<Skin[]>([]);

  useEffect(() => {
    getAllSkins().then((response) => {
      setSkins(response.data);
    });
  }, []);

  return (
    <div>
      {skins.map((skin) => (
        <div>
            <h1>
              {skin.name}
            </h1>
        </div>
      ))}
    </div>
  )
}