import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux';
import dbServices from '@utils/dbServices';
import Header from '@components/profile/Header';
import ProfileContainer from '@components/profile/UserContainer';
import { Divider } from 'react-native-elements';
import PostList from '@components/profile/PostList';
import { ScrollView } from 'react-native-virtualized-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#101010',
    },
});

const ProfileScreen = ({ navigation }: { navigation: any }) => {

    const profile_id = useSelector((state: any) => state.token).profile_id
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header navigation={navigation} />
                <ProfileContainer />
                <Divider style={{ marginTop: 10 }} />
                <PostList profile_id={profile_id} navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen