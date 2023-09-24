import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";

const { Screen, Navigator } = createStackNavigator();

import { Home } from "../pages/Home";
import { Sport } from "../pages/Sport";

export const StackRoutes = () => {

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Screen
        name="sport"
        component={Sport}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  );
};
