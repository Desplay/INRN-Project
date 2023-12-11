import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';

const Header = ({ profile_id, title }: { profile_id: any, title: any }) => {

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
            variables: { profile_id: profile_id },
            context: { headers: { authorization: token } },
            onError: (err) => {
                console.log(err)
            },
        }
    );

    const profile = data?.ShowProfile
    const image = profile?.avatarUri

    if (loading) return (<View></View>);

    const ImageGenetor = () => {
        if (image) {
            return (<Image source={{ uri: image }} style={styles.avatar} />)
        }
        return (<Image source={require("@assets/avatar/user1.png")} style={styles.noneAvatar} />)
    }
    return (
        <TouchableOpacity>
            <View style={styles.header}>
                <ImageGenetor />
                <View style={styles.headerContent}>
                    <Text style={styles.name}>{profile?.name}</Text>
                    <Text style={styles.caption}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    noneAvatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#bdbdbd',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 10,
    },
    headerContent: {
        justifyContent: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },
    caption: {
        color: '#bdbdbd',
    },
})

export default Header