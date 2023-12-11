import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

const Container = ({ item }: { item: any }) => {

  const [image, setImage] = useState('https://img.icons8.com/ios/500/no-image.png')

  useEffect(() => {
    if (item.imageUrl) {
      setImage(item.imageUrl)
    }
  }, [item])

  return (
    <View>
      <Text style={styles.text}>{item.content}</Text>
      {item && item.imageUrl ?
        <Image source={{ uri: image }} style={styles.postImage} /> : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
})

export default Container