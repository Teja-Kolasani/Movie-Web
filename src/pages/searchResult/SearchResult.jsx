import React , {useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/moviecard/MovieCard";
import noResults from "../../assets/no-results.png"


const SearchResult = () => {
   //states
   const [data, setData] = useState(null);
   const [pageNum, setPageNum] = useState(1);
   const [loading , setLoading] = useState(false);
   const {query} = useParams(); //query is url we searched (app.jsx)

   

   const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (res && res.results && res.results.length > 0) {
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...res.results],
        }));
        setPageNum((prev) => prev + 1);
      } else {
        // No more results, stop loading
        setPageNum(-1);
      }
    });
  };
   
  useEffect(() => {
    setPageNum(1);
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=1`)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [query]);

   //Till it is in loading state spinner will be shown
  return (
    <div className = "searchResultsPage">
      {loading && <Spinner initial={true} />} 
      {!loading && (
       <ContentWrapper>
                {data?.results?.length > 0 ? (
                  <>                  
                  <div className="pageTitle">
                     {`Search ${data?.total_results > 1 ?
                       "results" : "result" } of '${query}'`}
                  </div>

                  <InfiniteScroll
                   className="content"
                   dataLength={data?.results?.length || []}
                   next = {fetchNextPageData}
                   hasMore={pageNum <= data?.total_pages}
                   loader={<Spinner />}
                  >
                  
                    {data?.results?.map((item, index) => {
                     if(item.media_type === "person") return;
                     return (
                       <MovieCard key ={index} data={item} fromSearch={true}/>
                     )
                  })}
                  </InfiniteScroll>
              </>

                ) : (
                  <span className="resultNotFound">
                      Sorry,No Results Found!
                  </span>

                )}

       </ContentWrapper>

      )}
    </div>
  )
}

export default SearchResult