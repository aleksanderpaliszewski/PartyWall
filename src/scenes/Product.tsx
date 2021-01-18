import React, {FC, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Switch, Text} from 'react-native-paper';
import {FormikValues} from 'formik';
import {pickBy, identity} from 'lodash';

import Layout from '../components/Layout';
import ProductForm from '../components/ProductForm';
import {HomeStackScreenProps} from '../navigations/Home';
import UserContext from '../utils/userContext';
import SnackBarContext from '../utils/snackbarContext';
import ApiContext from '../utils/apiContext';
import {Scenes} from '../api/enums';

import globalStyles, {COLORS, SPACING} from '../utils/styles';

const Product: FC<HomeStackScreenProps<Scenes.Product>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {resetAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);
  const [isDrinkProduct, setIsDrinkProduct] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => setIsDrinkProduct(!isDrinkProduct);

  const deleteEmptyFields = (values: FormikValues) => pickBy(values, identity);

  const handleSubmit = (values: FormikValues) => {
    setLoading(true);

    return api
      .post('products', deleteEmptyFields(values))
      .then(() => navigation.replace(Scenes.Home))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <View style={globalStyles.appBar}>
        <Button
          mode="text"
          style={globalStyles.logoutButton}
          labelStyle={globalStyles.logoutButtonLabel}
          onPress={resetAuthData}>
          Log out
        </Button>
      </View>
      <View style={[globalStyles.roundedContainer, styles.container]}>
        <Text style={[globalStyles.header, styles.header]}>Product type</Text>
        <View style={styles.row}>
          <Switch value={!isDrinkProduct} onValueChange={toggleSwitch} />
          <Text style={styles.text}>Food product</Text>
        </View>
        <View style={styles.row}>
          <Switch value={isDrinkProduct} onValueChange={toggleSwitch} />
          <Text style={styles.text}>Drink product</Text>
        </View>
        <Text style={[globalStyles.header, styles.header]}>Product info</Text>
        <ProductForm
          loading={loading}
          handleSubmit={handleSubmit}
          isDrink={isDrinkProduct}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingVertical: SPACING.Vertical,
    paddingHorizontal: SPACING.Horizontal,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: SPACING.Vertical,
    marginHorizontal: SPACING.Horizontal,
  },
  text: {
    marginLeft: SPACING.Horizontal,
  },
  header: {
    color: COLORS.black,
    marginVertical: 2 * SPACING.Vertical,
  },
});

export default Product;
