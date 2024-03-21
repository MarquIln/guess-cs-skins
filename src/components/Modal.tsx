import { Skin } from '@/types/ISkin'
import { Button } from './Button'

interface ModalProps {
  onClose: () => void
  isOpen: boolean
  skin: Skin | null
}

export function Modal({ isOpen, onClose, skin }: ModalProps) {
  function handleWeapon() {
    console.log(skin?.weapon.name)
  }

  function handleCategory() {
    console.log(skin?.category.name)
  }

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="cursor-pointer rounded-md bg-white p-4">
          <h1>Qual dica voce deseja?</h1>
          <div className="flex justify-center gap-4 py-10">
            <Button
              onClick={() => {
                handleWeapon()
              }}
              content="Weapon"
            />
            <Button
              onClick={() => {
                handleCategory()
              }}
              content="Category"
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={onClose} content="Close" />
          </div>
        </div>
      </div>
    )
  }
}
