'use client'

interface ButtonProps {
  content: string
  onClick: () => void
}

export function Button({ content, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      {content}
    </button>
  );
}
