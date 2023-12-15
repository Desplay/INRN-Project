import Header from '@components/newPost/Header';
import PostCardInHome from '@components/home/PostCard';
import PostCardInProfile from '@components/profile/PostCard'
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from 'react-native';
import ShowCommentList from '@components/PostDetail/ShowCommentList';
import CreateComment from '@components/PostDetail/CreateComment';
import { ScrollView } from 'react-native-virtualized-view';

const PostDetailScreen = ({ navigation, route }: { navigation: any, route: any }) => {

  const lastScreen = navigation.getState().routes[navigation.getState().index - 1].name;
  const item = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} title={"POSTS"} />
        {lastScreen === 'HomeScreen' ? <PostCardInHome item={item.item} profile_id={item.profile_id} navigation={navigation} /> :
          <PostCardInProfile item={item.item} profile_id={item.profile_id} navigation={navigation} />
        }
        <ShowCommentList item={item.item} profile_id={item.profile_id} navigation={navigation} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        </View>
      </ScrollView>
      <CreateComment navigation={navigation} postId={item.item.id} />
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