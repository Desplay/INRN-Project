import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ProfileCard from './ProfileCard'

const ProfileContainer = ({ profiles, navigation }: { profiles: any, navigation: any }) => {
    if (!profiles)
        return (<></>)
    return (
        <View style={{ marginTop: 10 }}>
            <FlatList
                data={profiles}
                extraData={profiles}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }: { item: any }) => {
                    return (
                        <ProfileCard item={item} navigation={navigation}/>
                    )
                }}
            />
        </View>
    )
}

export default ProfileContainer