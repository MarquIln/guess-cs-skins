import { Skin } from '@/types/ISkin'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './Button'

interface Hint {
  label: string
  value: string
}

interface HintsProps {
  isOpen: boolean
  skin: Skin | null
}

function HintItem({ hint }: { hint: string }) {
  return <div className="flex justify-center py-2 text-white">{hint}</div>
}

function HintList({ hints }: { hints: string[] }) {
  return (
    <div>
      {hints.map((hint, index) => (
        <HintItem key={index} hint={hint} />
      ))}
    </div>
  )
}

export function Hints({ isOpen, skin }: HintsProps) {
  const [displayedHints, setDisplayedHints] = useState<string[]>([])

  const hints: Hint[] = useMemo(
    () => [
      { label: 'Has Souvenir?', value: skin?.souvenir ? 'Yes' : 'No' },
      { label: 'Rarity', value: skin?.rarity.name || '' },
      { label: 'Category', value: skin?.category.name || '' },
    ],
    [skin],
  )

  useEffect(() => {
    if (isOpen && displayedHints.length === 0) {
      const firstHint = hints[0]
      setDisplayedHints([`${firstHint.label}: ${firstHint.value}`])
    }
  }, [isOpen, displayedHints.length, hints])

  const showNextHint = () => {
    if (displayedHints.length < hints.length) {
      const nextHint = hints[displayedHints.length]
      setDisplayedHints((prevHints) => [
        ...prevHints,
        `${nextHint.label}: ${nextHint.value}`,
      ])
    }
  }

  const isLastHint = displayedHints.length === hints.length
  const buttonText = isLastHint
    ? 'There are no more hints 😳'
    : 'Show next hint'

  return (
    <div>
      {skin && isOpen && (
        <div>
          <Button onClick={showNextHint} content={buttonText} />
          <HintList hints={displayedHints} />
        </div>
      )}
    </div>
  )
}
