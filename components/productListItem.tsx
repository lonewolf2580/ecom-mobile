import { Text } from 'react-native';

export default function ProductList({ product }: { product: any }) {
    return(
      <Text style={{ fontSize: 30 }}>{product.name}</Text>
    )
  }