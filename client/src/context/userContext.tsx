import axios from "axios";
import React from "react";

interface UserContextProps {
    isAuthenticated: boolean;
    user: any;
    changeAuthenticationStatus: (user?: any) => void;
}

export const UserContext = React.createContext<UserContextProps>(undefined as any);

const UserContextProvider = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    React.useEffect(()=> {
        const userId = localStorage.getItem('user');
        if(userId) {
          const body = JSON.stringify({ userId});

          axios.post(
              '/auth/userId',
              body,
              {
                  headers: {
                      'Content-type': 'application/json'
                  }
              })
              .then((response) => {
                  const currentUser = {
                      id: response.data.user.id,
                      firstName: response.data.user.firstName,
                      lastName: response.data.user.lastName,
                      email: response.data.user.email,
                  };
                  console.log('Before change ', currentUser);
                  setUser(currentUser as any);
              })
              .catch((e) => {
                  //TODO SHARE ERROR 
                  console.log(e);
              })
          setIsAuthenticated(true);
        }
      }, []);
      const changeAuthenticationStatus = (user ?: any) => {
        isAuthenticated ? setUser(null) : setUser(user);
        setIsAuthenticated(!isAuthenticated);
        user && localStorage.setItem('user', user.id);
      };
      return (
        <UserContext.Provider value={{isAuthenticated, user, changeAuthenticationStatus}}>
            {props.children}
        </UserContext.Provider>
    );
    
}

export default UserContextProvider;