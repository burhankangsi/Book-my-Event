import React from "react";
import { Route } from "react-router-dom";

//layout
import VenueLayout from "../layouts/Venuelayout";

const VenueTemplate = ({ component: Component, ...rest }) => {
    return (
        <>
          <Route {...rest}
           component={(props) => (
               <VenueLayout>
                   <Component {...props} />
               </VenueLayout>
            )} 
           />
        </>  
    );
};

export default VenueTemplate;