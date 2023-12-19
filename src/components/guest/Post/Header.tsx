import { gql, useQuery } from '@apollo/client';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';

const Header = ({ profile_id, title, navigation }: { profile_id: any, title: any, navigation: any }) => {

    const token = useSelector((state: any) => state.token).token;
    const { data, loading } = useQuery(
        gql`
            query showProfile($profile_id: String!) {
                ShowProfile(profile_id: $profile_id) {
                name
                avatarUri
            }
      }`,
        {
            fetchPolicy: 'no-cache',
            context: { headers: { authorization: token } },
            variables: { profile_id: profile_id },
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
        <TouchableOpacity onPress={() => navigation.navigate('GuestProfileScreen', { profile_id: profile_id })}>
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
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#575757',
    },
    avatar: {
        width: 40,
        height: 40,
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
        fontSize: 16,
        color: '#fff',
    },
    caption: {
        color: '#bdbdbd',
    },
})

export default Header