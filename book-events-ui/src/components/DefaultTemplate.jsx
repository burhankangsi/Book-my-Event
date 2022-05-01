import React from "react";
import { Routes, Route } from "react-router-dom";

//layout
import DefaultLayout from "../layouts/DefaultLayout";

const DefaultTemplate = ({ component: Component, ...rest }) => {
    return (
        <>
        <Routes>
          <Route {...rest}
           component={(props) => (
               <DefaultLayout>
                   <Component {...props} />
               </DefaultLayout>
            )} 
           />
           </Routes>
        </>  
    );
};

export default DefaultTemplate;