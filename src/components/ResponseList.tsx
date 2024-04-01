import { Skin } from '@/types/ISkin'
import { Card, CardBody, Text } from '@chakra-ui/react'

interface ResponseListProps {
  answers: Skin[]
  selectedSkin: Skin | null
}

export function ResponseList({ answers, selectedSkin }: ResponseListProps) {
  return (
    <div className="flex flex-col">
      {answers.map((answer, index) => (
        <div key={index} className="flex flex-wrap">
          <Card
            className={`hover:-translate-y m-2 flex-1 transform justify-center gap-2 rounded-md border ${
              answer.name === selectedSkin?.name
                ? 'border-green-500 bg-green-500'
                : 'border-red-800 bg-red-800'
            } p-2 text-center text-white shadow-md transition duration-300 ease-in-out hover:shadow-lg`}
            color={'white'}
          >
            <CardBody>
              <Text>{answer.name}</Text>
            </CardBody>
          </Card>

          <Card
            className={`hover:-translate-y m-2 flex-1 transform justify-center  gap-2 rounded-md border ${
              answer.weapon.name === selectedSkin?.weapon.name
                ? 'border-green-500 bg-green-500'
                : 'border-red-800 bg-red-800'
            } p-2 text-center text-white shadow-md transition duration-300 ease-in-out hover:shadow-lg`}
            color={'white'}
          >
            <CardBody>
              <Text>{answer.weapon.name}</Text>
            </CardBody>
          </Card>
          <Card
            className={`hover:-translate-y m-2 flex-1 transform justify-center gap-2 rounded-md border ${
              answer.rarity.name === selectedSkin?.rarity.name
                ? 'border-green-500 bg-green-500'
                : 'border-red-800 bg-red-800'
            } p-2 text-center text-white shadow-md transition duration-300 ease-in-out hover:shadow-lg`}
            color={'white'}
          >
            <CardBody>
              <Text>{answer.rarity.name}</Text>
            </CardBody>
          </Card>
          <Card
            className={`hover:-translate-y m-2 flex-1 transform justify-center gap-2 rounded-md border ${
              answer.category.name === selectedSkin?.category.name
                ? 'border-green-500 bg-green-500'
                : 'border-red-800 bg-red-800'
            } p-2 text-center text-white shadow-md transition duration-300 ease-in-out hover:shadow-lg`}
            color={'white'}
          >
            <CardBody>
              <Text>{answer.category.name}</Text>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  )
}
