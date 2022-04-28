import React from 'react'

//Component
import Poster from '../components/Poster/poster.components';
import PartyFilters from '../components/PartyFilters/PartyFilters.components';

const Party = () => {
    return (
        <>
          <div className="container mx-auto px-4">
            <div className="w-full lg:flex lg:flex-row-reverse lg:px-14">
              <div className="lg:w-3/4 ">
                <h2 className="text-2xl font-bold mb-4">Party in Kochi</h2>
                <div className="flex flex-wrap">
                  <div className="w-1/2 md:w-1/3 my-3 lg:w-3/12">
                    <Poster 
                      src="https://in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAxNyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24/et00309696-fsqhgswrqc-portrait.jpg"
                      title="`Kanthamathi` (Sadarame) Surabhi Theatre Play"
                      subtitle="Telugu -> ₹400" 
                    />
                  </div>
                  <div className="w-1/2 md:w-1/3 my-3 lg:w-3/12">
                    <Poster 
                      src="https://in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAxNyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24/et00309696-fsqhgswrqc-portrait.jpg"
                      title="`Kanthamathi` (Sadarame) Surabhi Theatre Play"
                      subtitle="Telugu -> ₹400" 
                    />
                  </div>
                  <div className="w-1/2 md:w-1/3 my-3 lg:w-3/12">
                    <Poster 
                      src="https://in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAxNyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24/et00309696-fsqhgswrqc-portrait.jpg"
                      title="`Kanthamathi` (Sadarame) Surabhi Theatre Play"
                      subtitle="Telugu -> ₹400" 
                    />
                  </div>
                  <div className="w-1/2 md:w-1/3 my-3 lg:w-3/12">
                    <Poster 
                      src="https://in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAxNyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24/et00309696-fsqhgswrqc-portrait.jpg"
                      title="`Kanthamathi` (Sadarame) Surabhi Theatre Play"
                      subtitle="Telugu -> ₹400" 
                    />
                  </div>
                </div>
              </div> 
              <div className="lg:w-3/12">
                <h2 className="text-2xl font-bold mb-4">Filters</h2>
                <PartyFilters 
                    title="Date" 
                    tags={["Today", "Tomorrow", "This Weekend"]} />
                <PartyFilters 
                    title="Language" 
                    tags={["Tamil", "Telegu", "English"]} />
              </div>
            </div>
          </div> 
        </>
    )
}

export default Party;