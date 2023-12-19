import Header from '@components/home/Header';
import PostList from '@components/home/PostList';
import Stories from '@components/home/Stories';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-virtualized-view'
import { gql, useQuery } from '@apollo/client';
import { saveToken } from '@features/tokenStore';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#101010',
	},
});

const HomeScreen = ({ navigation }: { navigation: any }) => {

	const token = useSelector((state: any) => state.token).token
	const dispatch = useDispatch()
	const focused = useIsFocused()
	const followings = useSelector((state: any) => state.follow).followings

	const { data } = useQuery(
		gql`
    	query {
    	      ShowMyProfile {
    	        id
    	      }
    	    }`, {
		context: {
			headers: {
				authorization: token
			}
		}
	}
	)

	useEffect(() => {
		if (data) {
			dispatch(saveToken({ token: token, profile_id: data?.ShowMyProfile?.id }))
		}
		if (focused && !token) {
			navigation.navigate('LoginScreen')
		}
	}, [focused])

	const keyGenerator = () => '_' + Math.random().toString(36)

	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} />
			<ScrollView>
				<Stories />
				<View style={{ flex: 1 }}>
					{followings ? (
						followings.map((item: any, index: any) => (
							item == followings[index - 1] ? <View key={keyGenerator()}></View> :
								<PostList key={keyGenerator()} profile_id={item} navigation={navigation} />
						))
					) : <></>}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen