import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'

const Container = ({ item, navigation, profile_id }: { item: any, navigation: any, profile_id: any }) => {

  useEffect(() => {
    navigation.setOptions({
      title: item.title
    })
  }, [navigation, item.title])

  return (
    <View >
      <TouchableOpacity onPress={() => {
        navigation.navigate('PostDetailScreen', { item: item, profile_id: profile_id, lastScreen: 'HomeScreen' })
      }}>
        <Text style={styles.text}>{item.content}</Text>
        {item.imageUrl ?
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} /> : <></>
        }
      </TouchableOpacity>
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