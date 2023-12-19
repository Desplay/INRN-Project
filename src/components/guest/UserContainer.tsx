import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const Header = ({ profile_id }: { profile_id: any }) => {

  const token = useSelector((state: any) => state.token).token;
  const guestPosts = useSelector((state: any) => state.guestPosts).posts;
  const followings = useSelector((state: any) => state.follow).followings
  const [follow, setFollow] = useState(followings?.includes(profile_id))
  const [profile, setProfile] = useState({
    avatarUri: '',
    birthday: '',
    age: '',
    name: '',
    description: '',
  })

  const GetProfile = useLazyQuery(
    gql`
      query ShowProfile($profile_id: String!) {
        ShowProfile(profile_id: $profile_id) {
          avatarUri
          birthday
          age
          name
          description
        }
      }`,
    {
      context: { headers: { authorization: token } },
      fetchPolicy: 'no-cache',
    }
  );

  const [FollowUser] = useMutation(
    gql`
		mutation FollowProfile($profile_id: String!){
		  FollowProfile(profile_follow: $profile_id)
		}
		`, {
    fetchPolicy: 'no-cache',
    context: { headers: { authorization: token } },
  }
  )

  const [UnfollowUser] = useMutation(
    gql`
		mutation UnfollowProfile($profile_id: String!){
		  UnfollowProfile(profile_unfollow: $profile_id)
		}
		`, {
    fetchPolicy: 'no-cache',
    context: { headers: { authorization: token } },
  }
  )

  const handleFollow = async () => {
    if (follow) {
      setFollow(!follow)
      await UnfollowUser({ variables: { profile_id: profile_id } })
    }
    else {
      setFollow(!follow)
      await FollowUser({ variables: { profile_id: profile_id } })
    }
  }

  useEffect(() => {
    const get = async () => {
      const { data } = await GetProfile[0]({ variables: { profile_id: profile_id } });
      setProfile({
        avatarUri: data?.ShowProfile.avatarUri,
        birthday: data?.ShowProfile.birthday,
        age: data?.ShowProfile.age,
        name: data?.ShowProfile.name,
        description: data?.ShowProfile.description,
      })
    }
    get();
  }, [])



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
    followButton: {
      alignItems: 'center',
      marginHorizontal: 20,
      borderWidth: 0.25,
      borderColor: '#fff',
      backgroundColor: follow ? '#101010' : '#e7e7e7',
      justifyContent: 'center',
      borderRadius: 999,
      width: 150,
      height: 40,
    },
  })

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
        <View style={{ flexDirection: 'column', paddingRight: 30, width: '70%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              {guestPosts ? guestPosts.length : 0}
            </Text>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Posts
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
              {follow ? (
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  Following
                </Text>
              ) : (
                <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
                  Follow
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 20, marginTop: 10 }}>{profile.description}</Text>
      </View>
    </>
  )
}


export default Header