import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useState } from 'react'
import SearchBox from '@components/search/SearchBox'
import ProfileContainer from '@components/search/ProfileContainer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#101010',
    },
});

const SearchScreen = ({ navigation }: { navigation: any }) => {

    const [profiles, setProfiles] = useState([])

    return (
        <SafeAreaView style={styles.container}>
            <SearchBox setProfiles={setProfiles} />
            <ProfileContainer profiles={profiles} navigation={navigation} />
        </SafeAreaView>
    )
}

export default SearchScreen