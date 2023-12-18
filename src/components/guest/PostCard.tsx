import { View, StyleSheet } from 'react-native';
import Header from './Post/Header';
import Container from './Post/Container';
import Footer from './Post/Footer';

const PostCard = ({ item, profile_id, navigation }: { item: any, profile_id: any, navigation: any }) => {

  const getScreen = navigation.getState().routes[navigation.getState().index].name;
  const styles = StyleSheet.create({
    card: {
      padding: 10,
      marginTop: 10,
      backgroundColor: getScreen === 'PostDetailScreen' ? '#101010' : '#181818',
      borderRadius: 5,
    },
  });

  if (!item) return (<View></View>);

  return (
    <>
      <View style={styles.card}>
        <Header profile_id={profile_id} title={item.title} navigation={navigation} />
        <Container item={item} profile_id={profile_id} navigation={navigation} />
        <Footer item={item} profile_id={profile_id} navigation={navigation}/>
      </View>
    </>
  );
};

export default PostCard;