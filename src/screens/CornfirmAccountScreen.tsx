import { View, StyleSheet, Image } from 'react-native'
import ConfirmCode from '@components/signup/ConfirmCode'

const ConfirmAccountScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const item = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@assets/logo/Logo.png')} resizeMode='contain' style={{ height: 150, width: 150 }} />
      </View>
      <ConfirmCode navigation={navigation} item={item}/>
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

export default ConfirmAccountScreen