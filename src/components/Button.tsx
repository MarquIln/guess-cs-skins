'use client'

interface ButtonProps {
  content: string
  onClick?: () => void
  color?: string
  textColor?: string
}

export function Button({ content, onClick, color, textColor }: ButtonProps) {
  return (
    <button onClick={onClick} className={`bg-${color || 'blue'}-500 hover:bg-${color || 'blue'}-600 text-${textColor || 'white'} 
    font-bold py-2 px-4 rounded w-64`}>
      {content}
    </button>
  );
}
