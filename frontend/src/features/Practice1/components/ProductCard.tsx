import { Card, Image, Text, Button } from "@mantine/core"
import type { Product } from "../types/Product"

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props)=> {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section> 
            <Image
              src={product.image}
              height={160}
              fit="contain"
              />
            </Card.Section>  
            <Text fw={500} className="mt-2 line-clamp-1">
                {product.title}
            </Text> 

            <Text size="sm" c="dimmed" className="line-clamp-2">
                {product.description}
            </Text>

            <Text fw={700} className="mt-2">
                ₹ {product.price}
            </Text>

            <Button fullWidth mt="md">
                Add to Cart
            </Button>
        </Card>
    )
}

export default ProductCard