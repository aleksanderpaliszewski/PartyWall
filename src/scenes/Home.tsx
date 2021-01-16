import React, {FC, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

import Layout from '../components/Layout';
import UserContext from '../utils/userContext';

import styles from '../utils/styles';

const Home: FC = () => {
  const {resetAuthData} = useContext(UserContext);

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <Button mode="contained" onPress={resetAuthData}>
          Log out
        </Button>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
