interface InputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export function Input({ value, onChange, onSubmit }: InputProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <input
      type="text"
      placeholder="Chute qual skin você acha que é: "
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className="border border-gray-400 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
  )
}
