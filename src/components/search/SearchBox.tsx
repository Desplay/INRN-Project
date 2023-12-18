import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { gql, useLazyQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

const SearchBox = ({ setProfiles }: { setProfiles: any }) => {
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const token = useSelector((state: any) => state.token).token

	const [SearchProfiles] = useLazyQuery(
		gql`
			query SearchProfile($profile_name: String!) {
		  findProfile(profile_name: $profile_name) {
		    profiles {
		    	id
		      name
		      avatarUri
		      description
		  	}
		  }
		}`,
		{
			context: {
				headers: {
					authorization: token
				}
			},
			variables: {
				profile_name: search
			},
			fetchPolicy: 'no-cache',
			onCompleted: (data) => {
				setLoading(false)
				setProfiles(data.findProfile.profiles)
			},
			onError: (error) => {
				setLoading(true)
			},
		}
	)

	return (
		<View>
			<SearchBar
				platform="android"
				placeholder="Type Here..."
				style={{ color: '#fff' }}
				value={search}
				// @ts-ignore
				onChangeText={(text: any) => { 
					setLoading(true)
					setSearch(text)
					SearchProfiles()
				}}
				showLoading={loading}
				containerStyle={{ backgroundColor: '#181818', borderRadius: 999 }}
				inputContainerStyle={{ borderRadius: 999, marginHorizontal: 10, width: '96%' }}
				searchIcon={{ type: 'font-awesome', name: 'search', color: '#fff', size: 22.5 }}
				clearIcon={{ type: 'font-awesome', name: 'times', color: '#181818', size: 22.5 }}
				rightIcon={{ type: 'font-awesome', name: 'times', color: '#fff', size: 22.5 }}
				cancelIcon={{ type: 'font-awesome', name: 'chevron-left', color: '#fff', size: 22.5 }}
			/>
		</View>
	)
}

export default SearchBox