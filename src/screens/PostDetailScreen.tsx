import Header from '@components/newPost/Header';
import PostCardInHome from '@components/home/PostCard';
import PostCardInProfile from '@components/profile/PostCard';
import PostCardInGuest from '@components/guest/PostCard';
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from 'react-native';
import ShowCommentList from '@components/PostDetail/ShowCommentList';
import CreateComment from '@components/PostDetail/CreateComment';
import { ScrollView } from 'react-native-virtualized-view';

const PostDetailScreen = ({ navigation, route }: { navigation: any, route: any }) => {

  const router = route.params;
  const item = router.item;
  const lastScreen = router.lastScreen;
  const profile_id = router.profile_id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} title={"POSTS"} />
        {lastScreen === 'HomeScreen' ? <PostCardInHome item={item} profile_id={profile_id} navigation={navigation} /> :
          lastScreen === 'ProfileScreen' ? <PostCardInProfile item={item} profile_id={profile_id} navigation={navigation} /> :
            <PostCardInGuest item={item} profile_id={profile_id} navigation={navigation} />
        }
        <ShowCommentList post_id={item.id} profile_id={profile_id} navigation={navigation} lastScreen={lastScreen}/>
        <View style={{
          position: 'absolute', 
          bottom: 0,
          width: '100%',
        }}>
        </View>
      </ScrollView>
      <CreateComment navigation={navigation} postId={item.id} lastScreen={lastScreen}/>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101010',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default PostDetailScreen;