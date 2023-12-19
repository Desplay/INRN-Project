import { View, Text, FlatList } from 'react-native'
import CommentCard from './CommentCard'
import { useSelector } from 'react-redux'

const ShowCommentList = ({ post_id, profile_id, navigation, lastScreen }: { post_id: any, profile_id: any, navigation: any, lastScreen: any }) => {

    const comments = lastScreen === 'HomeScreen' ? useSelector((state: any) => state.posts).posts.find((post: any) => post.id === post_id).comments
        : lastScreen === 'ProfileScreen' ? useSelector((state: any) => state.myPosts).posts.find((post: any) => post.id === post_id).comments
            : useSelector((state: any) => state.guestPosts).posts.find((post: any) => post.id === post_id).comments

    return (
        <View>
            <FlatList
                data={comments}
                extraData={comments}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                    <>
                        <CommentCard comment={item} profile_id={profile_id} navigation={navigation} />
                    </>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ShowCommentList