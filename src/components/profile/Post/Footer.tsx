import { gql, useMutation } from '@apollo/client';
import { likePost, unlikePost } from '@features/myPostStore';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

const Footer = ({ item, profile_id, navigation }: { item: any, profile_id: any, navigation: any }) => {

  const token = useSelector((state: any) => state.token).token
  const my_profile_id = useSelector((state: any) => state.token).profile_id
  const commentCount = useSelector((state: any) => state.myPosts).posts.filter((post: any) => post.id == item.id)[0].comments.length
  const likeCount = useSelector((state: any) => state.myPosts).posts.filter((post: any) => post.id == item.id)[0].likesCount
  const likeList = useSelector((state: any) => state.myPosts).posts.filter((post: any) => post.id == item.id)[0].likes
  const [like, setLike] = likeList?.filter((like: any) => like.profileIdLiked == my_profile_id).length > 0 ? useState(true) : useState(false)
  const dispatch = useDispatch()
  const post_id = item.id

  const [Liked] = useMutation(
    gql`
      mutation LikePost($post_id: String!){
        likePost(PostId: $post_id)
      }`, {

    context: { headers: { authorization: token } },
  }
  )

  const [Unliked] = useMutation(
    gql`
      mutation UnLikePost($post_id: String!){
        unlikePost(PostId: $post_id)
      }`, {

    context: { headers: { authorization: token } },
  }
  )

  const handleLike = async () => {
    const { errors } = await Liked({ variables: { post_id } })
  }

  const handleUnlike = async () => {
    const { errors } = await Unliked({ variables: { post_id } })
  }


  const handleLikeButton = async () => {
    if (like) {
      dispatch(unlikePost({ post_id, profile_id: my_profile_id }))
      await handleUnlike()
      setLike(false)
    } else {
      dispatch(likePost({ post_id, profile_id: my_profile_id }))
      await handleLike()
      setLike(true)
    }
  }

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
      }}>
        <Text style={styles.likes}>{likeCount} Likes</Text>
        <Text style={styles.likes}>{commentCount} Comments</Text>
      </View>
      <Divider width={0.5} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleLikeButton()} style={styles.actionButton}>
          {!like ? <Image source={{ uri: "https://img.icons8.com/fluency-systems-regular/1000/bdbdbd/facebook-like--v1.png" }} style={{ height: 30, width: 30 }} /> :
            <Image source={{ uri: "https://img.icons8.com/fluency-systems-filled/1000/bdbdbd/facebook-like--v1.png" }} style={{ height: 30, width: 30 }} />}
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={
          () => {
            navigation.navigate('PostDetailScreen', { item: item, profile_id: profile_id })
          }
        }>
          <Image source={{ uri: "https://img.icons8.com/fluency-systems-regular/1000/bdbdbd/speech-bubble.png" }} style={{ height: 30, width: 30 }} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={{ uri: "https://img.icons8.com/fluency-systems-regular/1000/bdbdbd/forward-arrow.png" }} style={{ height: 30, width: 30 }} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  likes: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  footer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  actionText: {
    fontSize: 16,
    color: '#bdbdbd',
    marginLeft: 5,
  },
});

export default Footer;