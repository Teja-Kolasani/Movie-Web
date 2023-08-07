import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.scss";
import { useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';



const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data && data.results && data.results.length > 0 && url.backdrop) {
      const bg =
        url.backdrop + data.results[Math.floor(Math.random() * 25)].backdrop_path;
      setBackground(bg);
    }
  }, [data, url]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && background && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">WELCOME</span>
          <br />
          <span className="subTitle">
            Millions of Movies and TV Shows to Discover and Explore Now
          </span>
          <br />
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie or TV Show"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />

            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
