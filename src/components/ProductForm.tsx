import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik, FormikErrors, FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import CustomTextInput from '../components/CustomTextInput';
import ProductDetailFields from './ProductDetailFields';
import {AddProductSchema} from '../utils/schemas';

import globalStyles, {SPACING} from '../utils/styles';

interface ProductForm {
  loading: boolean;
  isDrink: boolean;
  handleSubmit: (values: FormikValues) => void;
}

const AddProductForm: FC<ProductForm> = ({handleSubmit, loading, isDrink}) => (
  <Formik
    enableReinitialize
    initialValues={{
      name: '',
      price: '',
      quantity: '',
      volume: '',
      description: '',
      weight: '',
    }}
    validationSchema={AddProductSchema}
    validate={(values) => {
      const errors = {} as FormikErrors<FormikValues>;

      if (isDrink && !values.volume) {
        errors.volume = 'Enter volume';
      }
      if (!isDrink && !values.description) {
        errors.description = 'Enter description';
      }
      if (!isDrink && !values.weight) {
        errors.weight = 'Enter weight';
      }

      return errors;
    }}
    onSubmit={handleSubmit}>
    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
      <View style={styles.productForm}>
        <CustomTextInput
          testID="name"
          fieldName="name"
          placeholder="Name"
          label="Name"
          textContentType="none"
          autoCapitalize="none"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          error={(touched.name && errors.name) || ''}
        />
        <CustomTextInput
          testID="price"
          fieldName="price"
          placeholder="Price"
          label="Price"
          textContentType="none"
          autoCapitalize="none"
          value={values.price}
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          error={(touched.price && errors.price) || ''}
        />
        <CustomTextInput
          testID="quantity"
          fieldName="quantity"
          placeholder="Quantity"
          label="Quantity"
          textContentType="none"
          autoCapitalize="none"
          value={values.quantity}
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          error={(touched.quantity && errors.quantity) || ''}
        />
        <ProductDetailFields isDrink={isDrink} />
        <Button
          style={globalStyles.button}
          mode="contained"
          testID="button"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit}>
          Add product
        </Button>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  productForm: {
    width: '100%',
    paddingHorizontal: SPACING.Horizontal,
  },
});

export default AddProductForm;
