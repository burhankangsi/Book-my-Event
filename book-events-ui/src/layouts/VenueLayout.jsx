import axios from 'axios';
import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';

//Components
import VenueNavbar from '../components/Navbar';

//Context
import { VenueContext } from '../Context'; 

 const VenueLayout = (props) => {
  const {id} = useParams();
  const { venue, setVenue } = useContext(VenueContext);

  useEffect(() => {
    const requestVenue = async () => {
       const getVenueData = await axios.get(`/movie/${id}`);
       setVenue(getVenueData.data);
    };
    requestVenue();
  }, [id]);

    return ( 
        <>
          <VenueNavbar />
          {props.children}
        </>
        );
};

export default VenueLayout;