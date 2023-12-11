import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Header from './Post/Header';
import Container from './Post/Container';
import Footer from './Post/Footer';

const PostCard = ({ item, profile_id }: { item: any, profile_id: any }) => {

  return (
    <View style={styles.card}>
      <Header profile_id={profile_id} title={item.title} />
      <Container item={item}/>
      <Footer item={item}/>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4267B2',
  },
  actionText: {
    color: '#fff',
  },
  card: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  comment: {
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default PostCard;