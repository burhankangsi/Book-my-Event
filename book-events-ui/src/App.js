import { Route } from "react-router-dom";
import axios from "axios";

// HOC
import DefaultHOC from "./components/DefaultTemplate";
import MovieHOC from "./components/HotelTemplate";

// Pages
import HomePage from "./layouts/Home";
import Venue from "./layouts/Venue";
import Partys from "./layouts/Party";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Axios default settings
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {};
axios.defaults.params["api_key"] = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <>
      <DefaultHOC path="/" exact component={HomePage} />
      <MovieHOC path="/movie/:id" excat component={Venue} />
      <DefaultHOC path="/plays" excat component={Partys} />
    </>
  );
};

export default App;

//px left and right padding
//py top and bottom padding