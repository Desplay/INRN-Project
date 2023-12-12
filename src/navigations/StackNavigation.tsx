import { NavigationContainer } from "@react-navigation/native";
import NewPostScreen from "@screens/NewPostScreen";
import LoginScreen from "@screens/LoginScreen";
import SignUpScreen from "@screens/SignUpScreen";
import ConfirmAccountScreen from "@screens/CornfirmAccountScreen";
import BottomNavigation from "./BottomNavigation";
import PostDetailScreen from "@screens/PostDetailScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createBottomTabNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          }
        }}
      >
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="AddPostScreen" component={NewPostScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ConfirmScreen" component={ConfirmAccountScreen} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
    </Stack.Navigator>
    </NavigationContainer >
  );
};

export default StackNavigation;
