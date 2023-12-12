import AddNewPost from '@components/newPost/AddNewPost';
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#181818',
	},
});

const NewPostScreen = ({ navigation }: { navigation: any }) => {
	return (
		<SafeAreaView style={styles.container}>
			<AddNewPost navigation={navigation}/>
		</SafeAreaView>
	)
}

export default NewPostScreen