import axios from 'axios'

export function getAllSkins() {
  return axios.get('https://bymykel.github.io/CSGO-API/api/en/skins.json')
}
