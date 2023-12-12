import Header from '@components/newPost/Header';
import PostCard from '@components/home/PostCard';
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from 'react-native';
import ShowCommentList from '@components/PostDetail/ShowCommentList';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import CreateComment from '@components/PostDetail/CreateComment';
import { ScrollView } from 'react-native-virtualized-view';

const PostDetailScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const item = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} title={"POSTS"} />
        <PostCard item={item.item} profile_id={item.profile_id} navigation={navigation} />
        <Divider width={0.25} style={{ backgroundColor: '#bdbdbd' }} />
        <ShowCommentList item={item.item} profile_id={item.profile_id} navigation={navigation} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        </View>
      </ScrollView>
      <CreateComment navigation={navigation} />
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