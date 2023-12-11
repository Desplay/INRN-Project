import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useSelector } from 'react-redux';

const Footer = ({ item }: { item: any }) => {
  const token = useSelector((state: any) => state.token).token
  const [likeCount, setLikeCount] = useState(0)
  const [like, setLike] = useState(false)
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

  const GetLikeCount = useLazyQuery(
    gql`
    query getLike($PostId: String!) {
      getLikesDetail(PostId: $PostId) {
        likes {
          userIdLiked
        }
      }
    }`, {
    context: { headers: { authorization: token } },
  }
  )

  const handleLike = async () => {
    const { data, errors } = await Liked({ variables: { post_id } })
    if (data) {
      console.log(data)
      setLike(true)
    }
    if (errors) {
      console.log(errors)
    }
  }

  const handleUnlike = async () => {
    const { data, errors } = await Unliked({ variables: { post_id } })
    if (data) {
      console.log(data)
      setLike(false)
    }
    if (errors) {
      console.log(errors)
    }
  }

  const handleLikeButton = async () => {
    if (like) {
      await handleUnlike()
      setLikeCount(likeCount - 1)
    } else {
      await handleLike()
      setLikeCount(likeCount + 1)
    }
  }

  useEffect(() => {
    const getLike = async () => {
      if (item.id) {
        const { data, error } = await GetLikeCount[0]({ variables: { PostId: item.id } })
        if (data) {
          console.log(data)
          data.getLikesDetail.likes.map((like: any) => {
            if (like.userIdLiked === item.userId)
              setLike(true)
            setLikeCount(data.getLikesDetail.likes.length)
            if (error?.message === 'No likes found') {
              setLikeCount(0)
            }
          })
        }
        getLike()
      }
    }
  }, [item.id])

  return (
    <View>
      <Text style={styles.likes}>{likeCount} Likes</Text>
      <Divider width={0.5} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleLikeButton()} style={styles.actionButton}>
          {!like ? <Image source={{ uri: "https://img.icons8.com/fluency-systems-regular/1000/bdbdbd/facebook-like--v1.png" }} style={{ height: 30, width: 30 }} /> :
            <Image source={{ uri: "https://img.icons8.com/fluency-systems-filled/1000/bdbdbd/facebook-like--v1.png" }} style={{ height: 30, width: 30 }} />}
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
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
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  actionText: {
    fontSize: 16,
    color: '#bdbdbd',
    marginLeft: 5,
  },
});

export default Footer;