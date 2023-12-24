import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ReactNativeBlobUtil from 'react-native-blob-util';

const Header = ({ navigation, title, item }: { navigation: any, title: any, item?: any }) => {

	const downloadImage = (url: string) => {
		// ReactNativeBlobUtil
		// 	.config({
		// 		fileCache: true,
		// 	})
		// 	.fetch('GET', url)
		// 	.then((res) => {
		// 		console.log('The file saved to ', res.path())
		// 	})
	}

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
				{
					!item?.imageUrl ? <Text></Text> :
						<TouchableOpacity onPress={() => downloadImage(item.imageUrl)}>
							<Image
								source={{ uri: 'https://img.icons8.com/fluency-systems-filled/500/ffffff/download.png' }}
								style={{ width: 30, height: 30, marginRight: 10 }}
							/>
						</TouchableOpacity>
				}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
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