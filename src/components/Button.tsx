'use client'

interface ButtonProps {
  content: string
  onClick?: () => void
}

export function Button({ content, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-64 rounded bg-blue-500
    px-4 py-2 font-bold text-white hover:bg-blue-600"
    >
      {content}
    </button>
  )
}
