import { FlatList, View } from 'react-native';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { savePosts } from '@features/postStore';

const PostList = ({ profile_id, navigation }: { profile_id: any, navigation: any }) => {

	const keyGenerator = () => '_' + Math.random().toString(36)
	const token = useSelector((state: any) => state.token).token
	const posts = useSelector((state: any) => state.posts).posts

	const dispatch = useDispatch()

	const getPosts = useLazyQuery(
		gql`
        query GetPostsByProfileId($profile_id: String!){
            getPostsByProfileId(profile_id: $profile_id) {
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
			if (posts.length === 0)
				if (profile_id) {
					const { data: Posts } = await getPosts[0]({ variables: { profile_id: profile_id } })
					const newPosts = []
					for await (const post of Posts.getPostsByProfileId.posts) {
						const { data  } = await getLikes[0]({ variables: { post_id: post.id } })
						const likes = data?.getLikesDetail?.likes ? data?.getLikesDetail?.likes : []
						newPosts.push({
							...post,
							likes: likes,
						})
					}
					dispatch(savePosts(newPosts))
				}
		}
		getPost()
	}, [posts])
	if (!token) {
		return (<View></View>);
	}

	return (
		<View>
			{posts ? (
				<FlatList
					data={posts}
					extraData={posts}
					inverted
					initialNumToRender={5}
					nestedScrollEnabled
					renderItem={({ item }) => <PostCard item={item} profile_id={profile_id} navigation={navigation} />}
					keyExtractor={() => keyGenerator()}
				/>
			) : <></>
			}
		</View>
	);
};

export default PostList;