import { View, Text, StyleSheet } from 'react-native'
import Header from './Header'
import React from 'react'
import PostForm from './PostForm'

const AddNewPost = ({ navigation }: { navigation: any }) => {
	return (
		<View style={styles.container}>
			<Header navigation={navigation} />
			<PostForm />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
	}
})

export default AddNewPost