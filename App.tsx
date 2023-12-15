import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tokenStore, { saveToken } from '@features/tokenStore';
import client from '@utils/graphqlServices';
import { useEffect } from 'react';
import dbServices from '@utils/dbServices';
import StackNavigation from '@navigations/StackNavigation';
import followStore from '@features/followStore';
import postStore from '@features/postStore';
import myPostStore from '@features/myPostStore';

const store = configureStore({
  reducer: {
    token: tokenStore,
    follow: followStore,
    posts: postStore,
    myPosts: myPostStore,
  },
});

const AppContainer = () => {
  const dispatch = useDispatch()



  useEffect(() => {
    async function getToken() {
      if (!await dbServices.getTableExists('localStorage')) {
        await dbServices.createTable('localStorage', ['field', 'value'])
        await dbServices.insertData('localStorage', ['field', 'value'], ['profile_id', ''])
        await dbServices.insertData('localStorage', ['field', 'value'], ['token', ''])
      }
    }
    getToken()
  }, [])

  useEffect(() => {
    async function getToken() {
      const token = await dbServices.getData('localStorage', ['field', 'value'], 'field = "token"')
      const profile_id = await dbServices.getData('localStorage', ['field', 'value'], 'field = "profile_id"')
      if (token[0].value !== '' || profile_id[0].value !== '') {
        dispatch(saveToken({ token: token[0].value, profile_id: profile_id[0].value }))
      }
    }
    getToken()
  }, [])
  // 
  return (
    <View style={styles.container}>
      <StackNavigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ApolloProvider>
  )
}
