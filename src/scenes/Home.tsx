import React, {FC, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

import Layout from '../components/Layout';

import styles from '../utils/styles';
import UserContext from '../utils/userContext';

const Home: FC = () => {
  const {setUser} = useContext(UserContext);

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <Button mode="contained" onPress={() => setUser(null)}>
          Log out
        </Button>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
