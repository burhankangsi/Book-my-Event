import React from "react";
//Components
import Navbar from "../components/Navbar";
import HeroCarousal from "../components/Settings";

const DefaultLayout = (props) => {  
    return ( 
    <>
      <Navbar />
      <HeroCarousal />
      {props.children}
    </>
    );
};

export default DefaultLayout;