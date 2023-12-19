import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Header = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Image style={styles.logo} source={require('@assets/logo/SpotiFive_Logo.png')} />
      </TouchableOpacity>
       <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('AddPostScreen' as any)
        }}>
          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png' }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png' }} />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View> */}
          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png' }} />
        </TouchableOpacity>
      </View>
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
  iconContainer: {
    flexDirection: 'row',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  }
})

export default Header