import Header from '@components/home/Header';
import PostList from '@components/home/PostList';
import Stories from '@components/home/Stories';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-virtualized-view'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#181818',
    },
});

const HomeScreen = ({ navigation }: { navigation: any }) => {

    const token = useSelector((state: any) => state.token).token
    const focused = useIsFocused()
    const followings = useSelector((state: any) => state.follow).followings

    useEffect(() => {
        if (focused && !token) {
            navigation.navigate('LoginScreen')
        }
    }, [token])
    const keyGenerator = () => '_' + Math.random().toString(36)

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
                <Stories />
                <View style={{ flex: 1 }}>
                    {followings ? (
                        followings.map((item: any, index: any) => (
                            item == followings[index - 1] ? <View key={keyGenerator()}></View> :
                                <PostList key={keyGenerator()} profile_id={item} />
                        ))
                    ) : <></>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen