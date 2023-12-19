import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Container from '@components/home/Post/Container'
import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';

const Header = () => {

  const token = useSelector((state: any) => state.token).token;
  const following = useSelector((state: any) => state.follow).followings;
  const myPosts = useSelector((state: any) => state.myPosts).posts;
  const followers = useSelector((state: any) => state.follow).followers;
  const [profile, setProfile] = useState({
    id: '',
    avatarUri: '',
    birthday: '',
    age: '',
    name: '',
    description: '',
  })

  const { data, loading } = useQuery(
    gql`
      query ShowMyProfile{
        ShowMyProfile {
          id
          avatarUri
          birthday
          age
          name
          description
        }
      }`,
    {
      context: { headers: { authorization: token } },
      onCompleted: (data) => {
        setProfile(data?.ShowMyProfile)
      },
    }
  );

  if (loading || !profile.id) return (<View></View>);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {profile?.avatarUri ? (
            <Image style={styles.userLogo} source={{ uri: profile.avatarUri }} />
          ) : (
            <View style={styles.userLogoContainer}>
              <Image style={styles.userLogo} source={require('@assets/avatar/user.png')} />
            </View>
          )}
          <Text style={{ marginTop: 5, color: 'white', fontSize: 18, fontWeight: 'bold' }}>{profile.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingRight: 30, width: '70%', justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              {followers ? followers.length : 0}
            </Text>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Followers
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              {following ? following.length : 0}
            </Text>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Following
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              {myPosts ? myPosts.length : 0}
            </Text>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Posts
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 20, marginTop: 10 }}>{profile.description}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  avatarContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  userContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  userLogoContainer: {
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#e7e7e7',
    backgroundColor: '#575757',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userLogo: {
    width: 100,
    height: 100,
    tintColor: '#e7e7e7',
  },
})

export default Header