interface InputProps {
  value: string
  onChange: (value: string) => void
  onEnterPress: () => void
}

export function Input({ value, onChange, onEnterPress }: InputProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnterPress()
    }
  }

  return (
    <input
      type="text"
      placeholder="Your answer here..."
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className="w-64 rounded border border-gray-400 px-2 py-1 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  )
}
