import { Button } from "./Button"
interface ResponseListProps {
  responses: string[]
  selectedSkin: string | null
}

export function ResponseList({ responses, selectedSkin }: ResponseListProps) {
  return (
    <div>
      {responses.map((response, index) => (
        <div key={index} className="text-white">
          {selectedSkin && selectedSkin === response ? (
            <span>{selectedSkin}</span>
          ) : (
            <span>{response}</span>
          )}
        </div>
      ))}
    </div>
  );
}