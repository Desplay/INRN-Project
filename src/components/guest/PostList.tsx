import { FlatList, View } from 'react-native';
import PostCard from '@components/guest/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { saveMyPosts } from '@features/myPostStore';
import { saveGuestPosts } from '@features/guestPostStore';
import { useIsFocused } from '@react-navigation/native';


const PostList = ({ profile_id, navigation }: { profile_id: any, navigation: any }) => {

	const keyGenerator = () => '_' + Math.random().toString(36)
	const token = useSelector((state: any) => state.token).token
	const guestPosts = useSelector((state: any) => state.guestPosts).posts
	const focused = useIsFocused()
	const dispatch = useDispatch()

	const getPosts = useLazyQuery(
		gql`
        query getPostsByProfileId($profile_id: String!) {
            getPostsByProfileId (profile_id: $profile_id) {
                posts {
                  id
                  title
                  content
                  imageUrl
				  likesCount
                  comments {
                    id
                    post_id
                    profile_id
                    reply_id
                    body
                    updated_at
                  }
                }
              }
        }`,
		{
			fetchPolicy: 'no-cache',
			context: { headers: { authorization: token } },
		}
	)

	const getLikes = useLazyQuery(
		gql`
			query GetLikesDetail($post_id: String!){
			  getLikesDetail(PostId: $post_id) {
			likes {
			  profileIdLiked
			}
		  }
		}`, {
		context: { headers: { authorization: token } },
	}
	)

	useEffect(() => {
		const getPost = async () => {
			if (profile_id) {
				const { data: Posts, loading } = await getPosts[0]({ variables: { profile_id } })
				if (!Posts) {
					dispatch(saveGuestPosts([]))
					return
				}
				if (!loading) {
					const newPosts = []
					for await (const post of Posts.getPostsByProfileId.posts) {
						const { data } = await getLikes[0]({ variables: { post_id: post.id } })
						const likes = data?.getLikesDetail?.likes ? data?.getLikesDetail?.likes : []
						newPosts.push({
							...post,
							likes: likes,
						})
					}
					dispatch(saveGuestPosts(newPosts))
				}
				
			}
		}
		getPost()
	}, [profile_id, focused])

	if (!guestPosts) {
		return (<View></View>);
	}

	return (
		<View style={{ marginTop: 10 }}>
			<FlatList
				inverted
				data={guestPosts}
				initialNumToRender={2}
				extraData={guestPosts}
				nestedScrollEnabled={true}
				renderItem={({ item }) => <PostCard item={item} profile_id={profile_id} navigation={navigation} />}
				keyExtractor={() => keyGenerator()}
			/>
		</View>
	);
};

export default PostList;