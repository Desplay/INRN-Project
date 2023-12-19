
import { Image, View } from 'react-native'
import HomeScreen from '@screens/HomeScreen'
import ProfileScreen from '@screens/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import SearchScreen from '@screens/SearchScreen'
import NotificationScreen from '@screens/NotificationScreen'


const NavigationIcons = [
    {
        name: "HomeScreen",
        icon: {
            active: "https://img.icons8.com/fluency-systems-filled/500/ffffff/home.png",
            inactive: "https://img.icons8.com/fluency-systems-regular/500/ffffff/home.png",
        },
    },
    {
        name: "SearchScreen",
        icon: {
            active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
            inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
        },
    },
    {
        name: "MediaScreen",
        icon: {
            active: "https://img.icons8.com/ios-filled/500/ffffff/instagram-reel.png",
            inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
        },
    },
    {
        name: "NotificationScreen",
        icon: {
            active: "https://img.icons8.com/fluency-systems-filled/500/ffffff/appointment-reminders.png",
            inactive: "https://img.icons8.com/fluency-systems-regular/500/ffffff/appointment-reminders.png"
        },
    },
    {
        name: "ProfileScreen",
        icon: {
            active: "https://img.icons8.com/material-rounded/500/ffffff/user-male-circle.png",
            inactive: "https://img.icons8.com/material-outlined/500/ffffff/user-male-circle.png",
        },
    },
];

const Navigation = createBottomTabNavigator()

const NoneCoponent = () => {
    return <View></View>
}

const BottomNavigation = ({ navigation }: { navigation: any }) => {
    const token = useSelector((state: any) => state.token).token;

    const getIcon = (props: any, screen: any) => {
        if (props.focused) {
            // @ts-ignore
            return NavigationIcons.find((icon) => icon.name === screen).icon.active
        }
        // @ts-ignore
        return NavigationIcons.find((icon) => icon.name === screen).icon.inactive
    }

    useEffect(() => {
        if (navigation.getState().routes[0].state) {
            const lastedRoute = navigation.getState().routes[0].state.history.length - 1
            const routeName = navigation.getState().routes[0].state.history[lastedRoute].key
            if (!token && routeName.includes('ProfileScreen')) {
                if (routeName !== 'ProfileScreen') {
                    navigation.navigate('ProfileScreen' as any)
                }
                navigation.navigate('LoginScreen' as any)
            }
        }
    }, [navigation.getState().routes[0].state])

    return (
        <Navigation.Navigator
            screenOptions={{
                title: '',
                headerShown: false,
                tabBarStyle: {
                    paddingTop: 15,
                    backgroundColor: '#181818',
                    borderTopWidth: 1,
                    height: 50,
                },
            }
            }
        >
            <Navigation.Screen name="HomeScreen" component={HomeScreen} options={{
                // @ts-ignore
                header(props) {
                    props.options.title = ''
                    return props
                },
                tabBarIcon(props) {
                    return (
                        <Image source={{ uri: getIcon(props, 'HomeScreen') }} style={{ width: 30, height: 30 }} />
                    )
                },
            }} />
            <Navigation.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarIcon(props) {
                    return <Image source={{ uri: getIcon(props, 'SearchScreen') }} style={{ width: 30, height: 30 }} />
                },
            }} />
            {/* <Navigation.Screen name="MediaScreen" component={NoneCoponent} options={{
                tabBarIcon(props) {
                    return <Image source={{ uri: getIcon(props, 'MediaScreen') }} style={{ width: 30, height: 30 }} />
                },
            }} /> */}
            <Navigation.Screen name="NotificationScreen" component={NotificationScreen} options={{
                tabBarIcon(props) {
                    return <Image source={{ uri: getIcon(props, 'NotificationScreen') }} style={{ width: 30, height: 30 }} />
                },
            }} />
            <Navigation.Screen name="ProfileScreen" component={ProfileScreen} options={{
                // @ts-ignore
                header(props) {
                    props.options.title = ''
                    return props
                },
                tabBarIcon(props) {
                    return <Image source={{ uri: getIcon(props, 'ProfileScreen') }} style={{ width: 30, height: 30 }} />
                },
            }} />
        </Navigation.Navigator >
    )
}

export default BottomNavigation