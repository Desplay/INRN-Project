import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { saveFollowings } from '@features/followStore';
import { View, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import { useEffect } from 'react';
const Stories = () => {
  const token = useSelector((state: any) => state.token).token;
  const followings = useSelector((state: any) => state.follow).followings
  const dispatch = useDispatch();

  const [GetFollow] = useLazyQuery(
    gql`
      query getFollowings {
        getFollowing {
          profile_id
        }
      }`,
    {      
      fetchPolicy: 'no-cache',
    }
  );

  useEffect(() => {
    const get = async () => {
      const { data, loading } = await GetFollow({context: { headers: { authorization: token } }})
      if (!loading) {
        dispatch(saveFollowings(data?.getFollowing.profile_id))
      }
    }
    get()
  }, [])



  const keyGenerator = () => '_' + Math.random().toString(36)

  if (!token) return (<View></View>);

  return (
    <View style={{
      paddingVertical: 10,
      backgroundColor: '#101010',
    }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={followings}
          horizontal={true}
          keyExtractor={keyGenerator}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          renderItem={({ item }) => (<UserIcon item={item} />)}
        />
      </ScrollView>
    </View>
  );
};

export default Stories;