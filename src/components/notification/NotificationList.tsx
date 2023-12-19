import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'

const NotificationList = () => {

  const token = useSelector((state: any) => state.token).token
  const [notification, setNotification] = useState([])
  const focused = useIsFocused()

  const getNotification = useLazyQuery(
    gql`
        query {
          getNotifications {
            body
          	id
          	postId
          	userId
          }
        }`, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: token
      }
    },
  }
  )

  const setNotificationRead = useMutation(
    gql`
        mutation {
          markAsRead
        }`, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: token
      }
    },
  }
  )

  useEffect(() => {
    const get = async () => {
      if (focused) {
        const { data } = await getNotification[0]()
        await setNotificationRead[0]()
        setNotification(data?.getNotifications)
      }
    }
    get()
  }, [focused])

  return (
    <View>
      <FlatList
        data={notification}
        renderItem={({ item }) => (
          <>
            <View>
              <View style={styles.card}>
                {/* @ts-ignore */}
                <Text style={styles.notificationText}>{item.body}</Text>
              </View>
            </View>
          </>
        )}
        // @ts-ignore
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bdbdbd',
    padding: 10,
  },
  card: {
    backgroundColor: '#181818',
    margin: 10,
    borderRadius: 10,
  }
})

export default NotificationList