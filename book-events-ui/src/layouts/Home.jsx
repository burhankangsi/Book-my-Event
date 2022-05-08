import axios from "axios";
import React, {useState, useEffect} from "react";

//Coponents
import EntertainmentCardSlider from "../components/EventCard";
import Poster from "../components/PosterComponents";
import PosterSlider from "../components/Poster";

//Config
import TempPosters from "../config/TempConfig";

const HomePage  = () => {

  const [popularVenues, setPopularVenues] = useState([]);
  const [topRatedVenues, setTopRatedVenues] = useState([]);
  const [upcomingVenues, setUpcomingVenues] = useState([]);

    useEffect(() => {
      const requestPopularVenues = async () => {
        console.log("Calling popular endpoint");
        const getPopularVenues = await axios.get("/popular");
        setPopularVenues([...popularVenues, getPopularVenues.data]);
        console.log("got popular api response");
        console.log(getPopularVenues.data);
      };
      requestPopularVenues();
    }, [popularVenues]);

    useEffect(() => {
      const requestTopRatedVenues = async () => {
        console.log("Calling top rated endpoint");
        const getTopRatedVenues = await axios.get("/top_rated");
        setTopRatedVenues([...topRatedVenues, getTopRatedVenues.data]);
        console.log("got top rated api response");
        console.log(getTopRatedVenues.data);
      };

      requestTopRatedVenues();
    }, [topRatedVenues]);

    useEffect(() => {
      const requestUpcomingVenues = async () => {
        console.log("Calling upcoming endpoint");
        const getUpcomingVenues = await axios.get("/upcoming");
        setUpcomingVenues([...upcomingVenues, getUpcomingVenues.data]);
        console.log("got upcoming api response");
        console.log(getUpcomingVenues.data);
      };

      requestUpcomingVenues();
    }, [upcomingVenues]);

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