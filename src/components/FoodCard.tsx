import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

import {Food} from '../api/interface';

import globalStyles, {COLORS, SPACING} from '../utils/styles';

interface FoodCard {
  product: Food;
}

const FoodCard: FC<FoodCard> = ({
  product: {name, price, quantity, description, weight},
}) => (
  <Card style={[styles.card, globalStyles.shadow]}>
    <Card.Content>
      <Title>
        {quantity} x {name} {price}
      </Title>
      <Paragraph>{description}</Paragraph>
      <Paragraph>{weight}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    marginVertical: SPACING.Vertical,
    marginHorizontal: SPACING.Horizontal,
  },
});

export default FoodCard;
