import { Route } from "react-router-dom";
import axios from "axios";

// HOC
import DefaultTemplate from "./components/DefaultTemplate";
import VenueTemplate from "./components/HotelTemplate";

// Pages
import HomePage from "./layouts/Home";
import Venue from "./layouts/Venue";
import Partys from "./layouts/Party";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Axios default settings
//backend api link
//xios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.baseURL = "localhost:8000";
axios.defaults.params = {};
axios.defaults.params["api_key"] = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <>
      <DefaultTemplate path="/" exact element={<HomePage/>} />
      <VenueTemplate path="/event/:id" exact element={<Venue/>} />
      <DefaultTemplate path="/plays" exact element={<Partys/>} />
    </>
  );
};

export default App;

//px left and right padding
//py top and bottom padding