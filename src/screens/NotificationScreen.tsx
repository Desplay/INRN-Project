import Header from '@components/notification/Header';
import NotificationList from '@components/notification/NotificationList';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#101010',
    },
});

const NotificationScreen = ({ navigation }: { navigation: any }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <NotificationList />
        </SafeAreaView>
    )
}

export default NotificationScreen