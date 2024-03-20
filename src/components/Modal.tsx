import { Button } from "./Button"

interface ModalProps {
  onClose: () => void
  isOpen: boolean
}

export function Modal({ isOpen, onClose }: ModalProps) {
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md cursor-pointer">
          <h1>Modal</h1>
          <Button onClick={onClose} content="Close"/>
        </div>
      </div>
    )
  }
}