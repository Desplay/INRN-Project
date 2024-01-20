import { FlatList, View } from 'react-native';
import PostCard from '@components/profile/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { saveMyPosts } from '@features/myPostStore';


const PostList = ({ profile_id, navigation }: { profile_id: any, navigation: any }) => {

	const keyGenerator = () => '_' + Math.random().toString(36)
	const token = useSelector((state: any) => state.token).token
	const Myposts = useSelector((state: any) => state.myPosts).posts
	const dispatch = useDispatch()

	const getPosts = useLazyQuery(
		gql`
        query getAllPosts {
            getAllPosts {
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
				const { data: Posts } = await getPosts[0]()
				if (!Posts) {
					dispatch(saveMyPosts([]))
					return
				}
				const newPosts = []
				for await (const post of Posts.getAllPosts.posts) {
					const { data } = await getLikes[0]({ variables: { post_id: post.id } })
					const likes = data?.getLikesDetail?.likes ? data?.getLikesDetail?.likes : []
					newPosts.push({
						...post,
						likes: likes,
					})
				}
				dispatch(saveMyPosts(newPosts))
			}
		}
		getPost()
	}, [token])

	if (!token || !profile_id || !Myposts) {
		return (<View></View>);
	}

	return (
		<View style={{ marginTop: 10 }}>
			<FlatList
				inverted
				data={Myposts}
				initialNumToRender={2}
				extraData={Myposts}
				nestedScrollEnabled={true}
				renderItem={({ item }) => <PostCard item={item} profile_id={profile_id} navigation={navigation} />}
				keyExtractor={() => keyGenerator()}
			/>
		</View>
	);
};

export default PostList;