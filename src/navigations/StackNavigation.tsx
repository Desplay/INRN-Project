import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NewPostScreen from "@screens/NewPostScreen";
import LoginScreen from "@screens/LoginScreen";
import SignUpScreen from "@screens/SignUpScreen";
import ConfirmAccountScreen from "@screens/CornfirmAccountScreen";
import BottomNavigation from "./BottomNavigation";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="AddPostScreen" component={NewPostScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ConfirmScreen" component={ConfirmAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
