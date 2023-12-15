import { View, Text, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <View>
        <Image source={require('@assets/images/Logo.png')} />
        <Text></Text>
      </View>
      <View>
        <View>
            <Text></Text>
            <Text></Text>
        </View>
        <View>
            <Text></Text>
            <Text></Text>
        </View>
        <View>
            <Text></Text>
            <Text></Text>
        </View>
      </View>
    </View>
  )
}

export default Header