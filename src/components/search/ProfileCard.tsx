import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

const ProfileCard = ({ navigation, item }: { navigation: any, item: any }) => {

	const followings = useSelector((state: any) => state.follow).followings
	const [follow, setFollow] = useState(followings?.includes(item.id))

	const styles = StyleSheet.create({

		userContainer: {
			marginHorizontal: 20,
		},
		followButton: {
			alignItems: 'center',
			marginHorizontal: 20,
			borderWidth: 0.25,
			borderColor: '#fff',
			backgroundColor: follow ? '#101010' : '#e7e7e7',
			justifyContent: 'center',
			borderRadius: 999,
			width: 150,
			height: 40,
		},
		userLogoContainer: {
			marginRight: 15,
			width: 55,
			height: 55,
			borderRadius: 999,
			borderWidth: 2,
			borderColor: '#e7e7e7',
			backgroundColor: '#575757',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
		},
		userLogo: {
			width: 55,
			height: 55,
			tintColor: '#e7e7e7',
		},
	});

	return (
		<View style={{ marginVertical: 10 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<TouchableOpacity style={styles.userContainer} onPress={() => {
					navigation.navigate('GuestProfileScreen', { profile_id: item.id })
				}}>
					<View style={{ flexDirection: 'row' }}>
						{item?.avatarUri ? (
							<Image style={styles.userLogo} source={{ uri: item.avatarUri }} />
						) : (
							<View style={styles.userLogoContainer}>
								<Image style={styles.userLogo} source={require('@assets/avatar/user.png')} />
							</View>
						)}
						<View>
							<Text style={{ color: '#e7e7e7', fontSize: 20, fontWeight: 'bold' }}>
								{item.name}
							</Text>
							<Text style={{ color: '#999999', fontSize: 14, }}>
								{item.description}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View style={{ justifyContent: 'center' }}>
					<TouchableOpacity style={styles.followButton} onPress={() => {
						setFollow(!follow)
					}}>
						{follow ? (
							<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
								Following
							</Text>
						) : (
							<Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
								Follow
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}


export default ProfileCard