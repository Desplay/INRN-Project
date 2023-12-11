import { FlatList, View } from 'react-native';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const PostList = ({ profile_id }: { profile_id: any }) => {

    const keyGenerator = () => '_' + Math.random().toString(36)
    const token = useSelector((state: any) => state.token).token
    const [posts, setPosts] = useState([])
    const getPosts = useLazyQuery(
        gql`
        query GetPostsByUserId($user_id: String!){
            getPostsByUserId(user_id: $user_id) {
              posts {
                id
                title
                content
                imageUrl
              }
            }
        }`,
        {
            context: { headers: { authorization: token } },
            onError: (err) => {
                console.log(err)
            },
        }
    )

    useEffect(() => {
        const getPost = async () => {
            if (profile_id) {
                const { data } = await getPosts[0]({ variables: { user_id: profile_id } })
                setPosts(data.getPostsByUserId.posts)
            }
        }
        getPost()
    }, [profile_id])

    if (!token) {
        return (<View></View>);
    }

    return (
        <View>
            {posts ? (
                <FlatList
                    data={posts}
                    extraData={posts}
                    nestedScrollEnabled
                    renderItem={({ item }) => <PostCard item={item} profile_id={profile_id} />}
                    keyExtractor={() => keyGenerator()}
                />
            ) : <></>
            }
        </View>
    );
};

export default PostList;