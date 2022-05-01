import React from "react";
import { Routes, Route } from "react-router-dom";

//layout
import VenueLayout from "../layouts/VenueLayout";

const VenueTemplate = ({ component: Component, ...rest }) => {
    return (
        <>
        <Routes>
          <Route {...rest}
           component={(props) => (
               <VenueLayout>
                   <Component {...props} />
               </VenueLayout>
            )} 
           />
        </Routes>
        </>  
    );
};

export default VenueTemplate;