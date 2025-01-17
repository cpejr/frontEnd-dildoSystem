import React, {useContext} from "react";
import "./styles.css";
import UserSidebar from "../../components/UserSidebar";
import { Route, useHistory } from "react-router-dom";
import MyRequests from "../MyRequests";
import { LoginContext } from "../../Contexts/LoginContext";
import WishList from "../../components/WishList";
import ProfileSettings from "../../components/ProfileSettings";
import RequestDetails from "../../components/RequestDetails";

function User(props) {

  const history = useHistory();

  const loginContext = useContext(LoginContext);

    if(loginContext.loggedIn){
        return(      
          <div>
            <UserSidebar name={loginContext.name} type={loginContext.type}>
              
              {
                <Route
                  path={`${props.match.path}/wishlist`}
                  component={WishList}
                />                                    
              }
              {
                 <Route
                 path={`${props.match.path}/myrequests`}
                 component={MyRequests}
               />    
              }
              {             
                <Route
                  path={`${props.match.path}/usersettings`}
                  component={ProfileSettings}
                />                            
              }
              {             
                <Route
                  path={`${props.match.path}/requestdetails/:id`}
                  component={RequestDetails}
                />                            
              }
              
            </UserSidebar>
          </div>
        )
          }
        else{
        
        history.push("/")
        return 0;
        }
      
      
  
}

export default User;
