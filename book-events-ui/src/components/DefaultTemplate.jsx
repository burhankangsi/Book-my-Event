import React from "react";
import { Route } from "react-router-dom";

//layout
import DefaultLayout from "../layouts/DefaultLayout";

const DefaultTemplate = ({ component: Component, ...rest }) => {
    return (
        <>
          <Route {...rest}
           component={(props) => (
               <DefaultLayout>
                   <Component {...props} />
               </DefaultLayout>
            )} 
           />
        </>  
    );
};

export default DefaultTemplate;