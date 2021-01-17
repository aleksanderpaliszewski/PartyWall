import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

import {Drink} from '../api/interface';

import globalStyles, {COLORS, SPACING} from '../utils/styles';

interface DrinkCard {
  product: Drink;
}

const DrinkCard: FC<DrinkCard> = ({
  product: {name, price, quantity, volume},
}) => (
  <Card style={[styles.card, globalStyles.shadow]}>
    <Card.Content>
      <Title>
        {quantity} x {name} {price}
      </Title>
      <Paragraph>{volume}</Paragraph>
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

export default DrinkCard;
