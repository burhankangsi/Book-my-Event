import React, { useContext, useState } from 'react';

//Component
import PaymentModel from '../payments/Payments';

//Context
import { VenueContext } from '../Context';

const VenueInfo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const { venue } = useContext(VenueContext);
   
    //optional chaining
    const genres = venue.genres && venue.genres.map(({name}) => name).join(", ");
 
    const rentVenues = () => {
        setIsOpen(true);
        setPrice(149);
    };

    const buyVenues = () => {
        setIsOpen(true);
        setPrice(599);
    };


    return (
        <>
          <PaymentModel setIsOpen={setIsOpen} isOpen={isOpen} price={price} />
          <div className="flex flex-col gap-3 lg:gap-8">
              <div className="flex items-center gap-3 md:px-4">
                  <div className="w-40 h-10">
                      <img 
                        src="https://in.bmscdn.com/moviemode/tvod/premiere-tag.png"
                        alt="premiere"
                        className="w-full h-full"
                      />
                  </div>
                  <span className="bg-bms-700 p-1 text-xs text-white rounded-md">
                      Streaming now
                  </span>
              </div>
              <div className="flex flex-col-reverse gap-3 lg:gap-5 lg:flex-col">
                <h1 className="text-white lg:text-5xl font-bold hidden lg:block">
                    {venue.original_title}
                </h1>
                <div className="text-white font-light flex flex-col gap-2 md:px-4">
                    <h4>4k &bull; {venue.original_language}</h4>
                    <h4>{(venue.runtime / 60).toFixed(2)} h &bull; {genres} &bull; 13+</h4>
                </div>
                <div className="flex items-center gap-3 md:px-4 md:w-screen lg:w-full">
                    <button onClick={rentVenues} className="bg-red-600 w-full py-2 text-white font-semibold rounded-lg">
                        Rent ₹149
                    </button>
                    <button onClick={buyVenues} className="bg-red-600 w-full py-2 text-white font-semibold rounded-lg">
                        Buy ₹599
                    </button>
                </div>
              </div>
          </div>
        </>
    )
}

export default VenueInfo;