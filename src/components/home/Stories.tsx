import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { saveFollowings } from '@features/followStore';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import { useEffect } from 'react';

const Stories = () => {
  const token = useSelector((state: any) => state.token).token;
  const dispatch = useDispatch();

  const { data } = useQuery(
    gql`
      query getFollowings {
        getFollowing {
          profile_id
        }
      }`,
    {
      context: { headers: { authorization: token } },
      onError: (err) => {
        console.log(err)
      },
    }
  );

  useEffect(() => {
    dispatch(saveFollowings(data?.getFollowing.profile_id))
  }, [data])

  const followings = data?.getFollowing.profile_id

  const keyGenerator = () => '_' + Math.random().toString(36)

  if (!token) return (<View></View>);
  return (
    <View style={{
      paddingVertical: 10,
      backgroundColor: '#101010',
    }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {followings && followings.map((item: any) => (
          <UserIcon key={keyGenerator()} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;