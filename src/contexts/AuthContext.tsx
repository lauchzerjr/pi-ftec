import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const { WEB_CLIENT_ID } = process.env;

export interface AuthContextDataProps {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  loadingSplash: boolean;
  signInWithGoogle: () => Promise<FirebaseAuthTypes.User>;
  signOutGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [loadingSplash, setLoadingSplash] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;
      setUser(user);

      if (user) {
        setUser(user);
        console.log("User com google ==>", user);
        return user;
      } else {
        throw new Error('Erro ao fazer login com o Google. Tente novamente mais tarde.');
      }

    } catch (error) {
      console.log("ERROR =>", error);
    } finally {
      setLoading(false);
    }
  }

  async function signOutGoogle() {
    try {
      await GoogleSignin.signOut();
      await auth().signOut()
      setUser(null);
    } catch (error) {
      console.error("ERROR =>", error);
    }
  }

  async function loadUserStorageData() {
    setLoadingSplash(true)
    const storage = await auth().onAuthStateChanged(setUser)
    setLoadingSplash(false)
    
    return storage;
  }

  useEffect(() => {
    loadUserStorageData()
    GoogleSignin.configure({})
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadingSplash,
        signInWithGoogle,
        signOutGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
