import { gql, useQuery } from '@apollo/client';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

const UserIcon = ({ item }: { item: any }) => {

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
            
            variables: { profile_id: item },
            context: { headers: { authorization: token } },
            onError: (err) => {
                console.log(err)
            },
        }
    );

    if (loading) return (<View></View>);

    const profile = data?.ShowProfile

    return (
        <View>
            <TouchableOpacity style={styles.userContainer}>
                {profile?.avatarUri ? (
                    <Image style={styles.userLogo} source={{ uri: profile.avatarUri }} />
                ) : (
                    <View style={styles.userLogoContainer}>
                        <Image style={styles.userLogo} source={require('@assets/avatar/user.png')} />
                    </View>
                )}
                <Text style={{ color: '#e7e7e7', textAlign: 'center' }}>
                    {profile?.name.length > 10 ? profile.name.slice(0, 10) + '...' : profile.name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    userContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    userLogoContainer: {
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

export default UserIcon