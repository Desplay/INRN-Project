import { gql, useMutation } from '@apollo/client';
import { removeToken } from '@features/tokenStore';
import dbServices from '@utils/dbServices';
import client from '@utils/graphqlServices';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ navigation }: { navigation: any }) => {
  const token = useSelector((state: any) => state.token).token;
  const dispatch = useDispatch();

  const [SignOut] = useMutation(
      gql`
          mutation signOut {
              SignOut
          }
      `,
      {
          onCompleted: async () => {
              await dbServices.updateData('localStorage', ['field', 'value'], ['token', ''], 'field = "token"')
          }
      });

  const handleSignOut = async () => {
      dispatch(removeToken())
      await SignOut({ context: { headers: { authorization: token } } });
      client.clearStore();
      navigation.navigate('HomeScreen' as any)
      navigation.navigate('LoginScreen' as any)
  }

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Image style={styles.logo} source={require('@assets/logo/SpotiFive_Logo.png')} />
      </TouchableOpacity>
       <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleSignOut}>
          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/fluency-systems-regular/1000/ffffff/exit--v1.png' }} />
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