import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Header = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Image style={styles.logo} source={require('@assets/logo/SpotiFive_Logo.png')} />
      </TouchableOpacity>
      <Text style={{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      }}> Notifications </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  }
})

export default Header