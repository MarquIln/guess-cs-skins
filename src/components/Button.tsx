'use client'
import { Skin } from '@/types/ISkin'

interface ButtonProps {
  content: string | Skin
  color?: string
  onClick?: () => void
}

export function Button({ content, color, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-64 rounded px-4 py-2 font-bold text-white ${
        color
          ? `bg-${color}-500 hover:bg-${color}-600`
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {typeof content === 'string' ? content : content.name}
    </button>
  )
}
