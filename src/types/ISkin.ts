export type Skin = {
  name: string
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
  collections: {
    name: string
  }
  rarity: {
    name: string
  }
  phase?: string
}
