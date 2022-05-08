import React from "react";
import { Link } from "react-router-dom";

const Poster = (props) => {
    return (
      <Link to={`/event/${props.id}`}>
        <div className="flex flex-col items-start gap-2 px-1 md:px-3">
            <div className="h-40 md:h-80">
                <img 
                  src={`https://www.learntek.org/wp-content/uploads/2017/09/UI-DEVeloper-1.jpg`} 
                  alt={props.original_title} className="w-full h-full rounded-md" 
                />
            </div>
            <h3 className={`text-lg font-bold ${props.isDark ? "text-white" : "text-gray-700"}`}>
                {props.original_title}
            </h3>
            <p className={`text-lg font-bold ${props.isDark ? "text-white" : "text-gray-700"}`}>
                {props.subtitle}
            </p>
        </div>
      </Link>
    );
};

export default Poster;