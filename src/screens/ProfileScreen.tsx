import { Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { removeToken } from '@features/tokenStore';
import { gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import dbServices from '@utils/dbServices';
import { useEffect } from 'react';
import Header from '@components/home/Header';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#181818',
    },
});

const ProfileScreen = ({ navigation }: { navigation: any }) => {
    const token = useSelector((state: any) => state.token).token;
    const dispatch = useDispatch();

    const [SignOut, { loading }] = useMutation(
        gql`
            mutation signOut {
                SignOut
            }
        `,
        {
            
            onError: (err) => {
                console.log(err)
            },
            onCompleted: async () => {
                await dbServices.updateData('localStorage', ['field', 'value'], ['token', ''], 'field = "token"')
            }
        });

    const handleSignOut = async () => {
        await SignOut({ context: { headers: { authorization: token } } });
        dispatch(removeToken())
        navigation.navigate('LoginScreen' as any)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <Text>ProfileScreen</Text>
            <TouchableOpacity onPress={handleSignOut}><Text>{token}</Text></TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileScreen