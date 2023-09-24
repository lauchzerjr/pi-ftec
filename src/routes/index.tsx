import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../pages/SignIn";
import { StackRoutes } from "./stack.routes";

export const Routes = () => {
  const { user } = useAuth();

  console.log('user', user)

  return(
    <NavigationContainer>
      {user ? <StackRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}