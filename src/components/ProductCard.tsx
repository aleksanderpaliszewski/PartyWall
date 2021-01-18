import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

import {Drink, Food} from '../api/interface';

import globalStyles, {COLORS, SPACING} from '../utils/styles';

interface ProductCard {
  product: Food | Drink;
  deleteProduct: (id: number) => void;
}

const ProductCard: FC<ProductCard> = ({product, deleteProduct}) => {
  const {id, name, price, quantity} = product;

  const isDrink = (p: Food | Drink): p is Drink => !!(p as Drink).volume;

  return (
    <Card style={[styles.card, globalStyles.shadow]} testID="product">
      <Card.Content>
        <Title>
          {quantity} x {name} {price}
        </Title>
        {isDrink(product) ? (
          <Paragraph>{product.volume}</Paragraph>
        ) : (
          <>
            <Paragraph>{product.description}</Paragraph>
            <Paragraph>{product.weight}</Paragraph>
          </>
        )}
        <Button onPress={() => deleteProduct(id)}>Delete</Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    marginVertical: SPACING.Vertical,
    marginHorizontal: SPACING.Horizontal,
  },
});

export default ProductCard;
