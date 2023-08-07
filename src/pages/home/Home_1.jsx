import React from 'react'
import "./style.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import TopRated from './topRated/TopRated';
import Recommended_1 from './recommended_1/Recommended_1';



const Home_1 = () => {
  return (
    <div className="homePage">
        <HeroBanner />
        <Trending />
        <Recommended_1 />
        <TopRated />
        {/* <div style = {{height : 1000}}></div> */}
    </div>
  )
}

export default Home_1