import React, {FC, useEffect} from 'react';
import {FormikValues, useFormikContext} from 'formik';

import CustomTextInput from '../components/CustomTextInput';

interface ProductDetailFields {
  isDrink: boolean;
}

const ProductDetailFields: FC<ProductDetailFields> = ({isDrink}) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<FormikValues>();

  useEffect(() => {
    setFieldValue('volume', '');
    setFieldValue('description', '');
    setFieldValue('weight', '');
  }, [setFieldValue, isDrink]);

  if (isDrink) {
    return (
      <CustomTextInput
        testID="volume"
        fieldName="volume"
        placeholder="Volume"
        label="Volume"
        textContentType="none"
        autoCapitalize="none"
        value={values.volume}
        onChangeText={handleChange('volume')}
        onBlur={handleBlur('volume')}
        error={((touched.volume && errors.volume) as string) || ''}
      />
    );
  }

  return (
    <>
      <CustomTextInput
        testID="description"
        fieldName="description"
        placeholder="Description"
        label="Description"
        textContentType="none"
        autoCapitalize="none"
        value={values.description}
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        error={(touched.description && (errors.description as string)) || ''}
      />
      <CustomTextInput
        testID="weight"
        fieldName="weight"
        placeholder="Weight"
        label="Weight"
        textContentType="none"
        autoCapitalize="none"
        value={values.weight}
        onChangeText={handleChange('weight')}
        onBlur={handleBlur('weight')}
        error={(touched.weight && (errors.weight as string)) || ''}
      />
    </>
  );
};

export default ProductDetailFields;
