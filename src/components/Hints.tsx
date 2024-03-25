import { Skin } from '@/types/ISkin'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './Button'
interface HintsProps {
  isOpen: boolean
  skin: Skin | null
}

export function Hints({ isOpen, skin }: HintsProps) {
  const [displayedHints, setDisplayedHints] = useState<string[]>([])

  const hints = useMemo(
    () => [
      { label: 'Has Souvenir?', value: skin?.souvenir ? '✅' : '❌' },
      { label: 'Rarity', value: skin?.rarity.name },
      { label: 'Category', value: skin?.category.name },
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

  return (
    <div>
      {skin && isOpen && (
        <div>
          {displayedHints.length < hints.length ? (
            <div>
              <Button onClick={showNextHint} content={'Show next hint'} />
              <div>
                {displayedHints.map((hint, index) => (
                  <div className="flex justify-center py-2" key={index}>
                    {hint}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Button
                onClick={showNextHint}
                content={'There are no more hints 😳'}
              />
              <div>
                {displayedHints.map((hint, index) => (
                  <div className="flex justify-center py-2" key={index}>
                    {hint}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
