import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux';
import Header from '@components/guest/Header';
import ProfileContainer from '@components/guest/UserContainer';
import { Divider } from 'react-native-elements';
import PostList from '@components/guest/PostList';
import { ScrollView } from 'react-native-virtualized-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#101010',
    },
});

const GuestProfileScreen = ({ navigation, route }: { navigation: any, route: any }) => {

    const profile_id = route.params.profile_id;
    const my_profile_id = useSelector((state: any) => state.token).profile_id;
    if (profile_id == my_profile_id) {
        navigation.navigate('ProfileScreen');
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header navigation={navigation} />
                <ProfileContainer profile_id={profile_id}/>
                <Divider style={{ marginTop: 10 }} />
                <PostList profile_id={profile_id} navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default GuestProfileScreen