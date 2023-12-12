import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const CommentCard = ({ comment, profile_id, navigation }: { comment: any, profile_id: any, navigation: any }) => {

    const token = useSelector((state: any) => state.token).token;

    const { data, loading } = useQuery(
        gql`
            query showProfile($profile_id: String!) {
                ShowProfile(profile_id: $profile_id) {
                id
                name
                avatarUri
            }
      }`,
        {
            
            variables: { profile_id: comment.profile_id },
            context: { headers: { authorization: token } },
            onError: (err) => {
                console.log(err)
            },
        }
    );

    if (loading) return (<View></View>)

    return (
        <View style={styles.container}>
            {data?.ShowProfile?.avatarUri ? (
                <Image style={styles.avatar} source={{ uri: data.ShowProfile.avatarUri }} />
            ) : (
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={require('@assets/avatar/user1.png')} />
                </View>
            )}
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <View style={styles.commentContainer}>
                    <Text style={styles.name}>{data?.ShowProfile?.name}</Text>
                    <Text style={styles.comment}>{comment.body}</Text>
                </View>
                <Text style={styles.timestamp}>{moment(comment.updated_at).fromNow()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    timestamp: {
        marginLeft: 10,
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: '#e7e7e7',
        backgroundColor: '#575757',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    commentContainer: {
        flexDirection: 'column',
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#3A3B3C',
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
    },
    comment: {
        color: '#e7e7e7',
        marginTop: 2,
    },
});

export default CommentCard;