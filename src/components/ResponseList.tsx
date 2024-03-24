import { Skin } from '@/types/ISkin'
import { Card, CardBody, Text } from '@chakra-ui/react'

interface ResponseListProps {
  responses: Skin[]
  selectedSkin: Skin | null
}

export function ResponseList({ responses }: ResponseListProps) {
  return (
    <div>
      {responses.map((response, index) => (
        <div key={index}>
          <Card
            key={index}
            borderRadius="10px"
            className="hover:-translate-y m-2 w-full transform gap-2 rounded-md border border-red-800 bg-red-800 p-2 text-center text-white shadow-md transition duration-300 ease-in-out hover:border-red-700 hover:bg-red-700 hover:shadow-lg"
            color={'white'}
          >
            <CardBody>
              <Text>{response.name}</Text>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  )
}
