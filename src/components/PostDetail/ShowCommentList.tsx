import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import CommentCard from './CommentCard'

const ShowCommentList = ({ item, profile_id, navigation }: { item: any, profile_id: any, navigation: any }) => {

    return (
        <View>
            <FlatList
                data={item.comments}
                extraData={item.comments}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                    <>
                        <CommentCard comment={item} profile_id={profile_id} navigation={navigation} />
                        <CommentCard comment={item} profile_id={profile_id} navigation={navigation} />
                        <CommentCard comment={item} profile_id={profile_id} navigation={navigation} />
                        <CommentCard comment={item} profile_id={profile_id} navigation={navigation} />
                        <CommentCard comment={item} profile_id={profile_id} navigation={navigation} />
                    </>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ShowCommentList