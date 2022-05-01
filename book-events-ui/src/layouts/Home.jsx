import axios from "axios";
import React, {useState, useEffect} from "react";

//Coponents
import EntertainmentCardSlider from "../components/EventCard";
import Poster from "../components/Poster";
import PosterSlider from "../components/Poster";

//Config
import TempPosters from "../config/TempConfig";

const HomePage  = () => {

  const [popularVenues, setPopularVenues] = useState([]);
  const [topRatedVenues, setTopRatedVenues] = useState([]);
  const [upcomingVenues, setUpcomingVenues] = useState([]);
       
    useEffect(() => {
      const requestPopularVenues = async () => {
        const getPopularVenues = await axios.get("/movie/popular");
        setPopularVenues(getPopularVenues.data.results);
      };

      requestPopularVenues();
    }, []);

    useEffect(() => {
      const requestTopRatedVenues = async () => {
        const getTopRatedVenues = await axios.get("/movie/top_rated");
        setTopRatedVenues(getTopRatedVenues.data.results);
      };

      requestTopRatedVenues();
    }, []);

    useEffect(() => {
      const requestUpcomingVenues = async () => {
        const getUpcomingVenues = await axios.get("/movie/upcoming");
        setUpcomingVenues(getUpcomingVenues.data.results);
      };

      requestUpcomingVenues();
    }, []);

    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="container mx-auto px-1 lg:px-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 my-3">
              The best of Entertainment
            </h1>  
            <EntertainmentCardSlider />
          </div>
          <div className="bg-bms-800 py-10"> 
            <div className="container mx-auto px-2 lg:px-4 flex flex-col gap-3">
                <div className="hidden md:flex">
                    <img 
                       src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
                       alt="Rupay"
                       className="w-full h-full"
                       />
                </div>
                < PosterSlider 
                   images={popularVenues} 
                   title="Premieres" 
                   subtitle="Brand new releases every friday"
                   isDark
                />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 my-8">
        < PosterSlider 
            images={topRatedVenues} 
            title="Online Streaming events" 
            isDark={false}
        />
        </div>
        <div className="container mx-auto px-4 my-8">
        < PosterSlider 
            images={upcomingVenues} 
            title="Outdoor events" 
            isDark={false}
        />
        </div>
      </>
    );
};

export default HomePage; 