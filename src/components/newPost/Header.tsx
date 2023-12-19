import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

const Header = ({ navigation, title }: { navigation: any, title: any }) => {
	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png' }}
						style={{ width: 30, height: 30 }}
					/>
				</TouchableOpacity>
				<Text style={styles.text}>{title}</Text>
				<Text></Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		marginRight: 23,
	}
})

export default Header