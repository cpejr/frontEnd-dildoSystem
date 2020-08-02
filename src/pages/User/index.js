import React, {useState} from "react";
import "./styles.css";
import UserSidebar from "../../components/UserSidebar";
import Header from "../../components/Header";
import { Route, useHistory } from "react-router-dom";
import MyRequests from "../MyRequests";
import { LoginContext } from "../../Contexts/LoginContext";
import WishList from "../../components/WishList";
import ProfileSettings from "../../components/ProfileSettings";

function User(props) {

  const history = useHistory();

  return (
    <LoginContext.Consumer>
      {(value) => {
        if (value.type === "retailer" || "wholesaler") {
          return (
            <div>
              <UserSidebar name={value.name} type={value.type}>
                
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
                  <Route
                    path={`${props.match.path}/usersettings`}
                    component={ProfileSettings}
                  />                            
                }
                
              </UserSidebar>
            </div>
          );
        } else {
          history.push("/");
        }
      }}
    </LoginContext.Consumer>
  );
}

export default User;
