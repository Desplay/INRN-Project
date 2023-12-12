import LoginForm from '@components/login/LoginForm'
import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { useSelector } from 'react-redux'

const LoginScreen = ({ navigation }: { navigation: any }) => {

  const token = useSelector((state: any) => state.token).token
  const focused = useIsFocused()


  useEffect(() => {
    if (focused && token) {
      navigation.navigate('HomeScreen')
    }
  }, [token])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@assets/logo/Logo.png')} resizeMode='contain' style={{ height: 150, width: 150 }} />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
  }
})

export default LoginScreen