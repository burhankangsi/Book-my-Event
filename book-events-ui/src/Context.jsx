import React, { useState } from "react";
 

export const VenueContext =  React.createContext();

const VenueProvider = ({ children }) => {
   const [movie, setVenue] = useState({
       id: 0,
       original_title: "",
       overview: "",
       backdrop_path: "",
       poster_path: "",
   });

   return (
     <VenueContext.Provider value={{ movie, setVenue }}>
         {children}
     </VenueContext.Provider>
   );
};

export default VenueProvider;