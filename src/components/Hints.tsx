import { Skin } from '@/types/ISkin'
import { Card, CardBody, Text } from '@chakra-ui/react'

interface HintsProps {
  isOpen: boolean
  skin: Skin | null
}

export function Hints({ isOpen, skin }: HintsProps) {
  return (
    <div>
      {skin && isOpen && (
        <div>
          <Card>
            <CardBody>
              <Text>Has Souvenir: {skin.souvenir ? '✅' : '❌'}</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text>Collection: {skin.collections.name}</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text>Category: {skin.category.name}</Text>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
}
