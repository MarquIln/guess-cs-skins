import { Skin } from '@/types/ISkin'

interface ResponseListProps {
  responses: Skin[] | string[]
  selectedSkin: Skin | null
}

export function ResponseList({ responses, selectedSkin }: ResponseListProps) {
  return (
    <div>
      {responses.map((response, index) => (
        <div key={index} className="text-white">
          {selectedSkin && selectedSkin === response ? (
            <span>{selectedSkin.name}</span>
          ) : (
            <span>
              {typeof response === 'string' ? response : response.name}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
