import React from 'react'
import "./style.scss";
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
//import Cast from './cast/Cast';


const Details_1 = () => {

  const {mediaType,id} =  useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      </div>  
  ); 
};

export default Details_1;



