export type Skin = {
  name: string
  fakeName: string
  image: string
  price: number
  weapon: {
    name: string
  }
  category: {
    name: string
  }
  pattern: {
    name: string
  }
  souvenir: boolean
  collections: {
    id: string
    name: string
  }
  rarity: {
    name: string
  }
  phase?: string
}
