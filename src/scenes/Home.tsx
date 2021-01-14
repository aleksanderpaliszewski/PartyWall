import React, {useEffect, useContext, useState, FC} from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';

import Layout from '../components/Layout';
import ApiContext from '../utils/apiContext';
import {HelloPayload} from '../api/types';

import styles from '../utils/styles';

const Home: FC = () => {
  const api = useContext(ApiContext);
  const [title, setTitle] = useState('');

  useEffect(() => {
    api
      .get<HelloPayload>('hello')
      .then(({data: {title}}) => setTitle(title))
      .catch(({message}) => setTitle(message));
  }, [api]);

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, styles.header]}>{title}</Text>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
