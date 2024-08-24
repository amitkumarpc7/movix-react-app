import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// Routes Components
import Details from "./pages/Details/Details"
import Explore from "./pages/Explore/Explore"
import SearchResult from "./pages/SearchResult/SearchResult"
import PageNotFound from "./pages/404/PageNotFound"
import Home from "./pages/Home/Home"
import Header from "./Components/Common/Header/Header"
import Footer from "./Components/Common/Footer/Footer"
import { fetchDataFromApi } from "./utils/api";
import { getApiCOnfiguration, getGenres } from "./store/slices/homeSlice";



function App() {

  const dispatch=useDispatch();
  const {url}=useSelector(state=>state.home);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);

  const fetchApiConfig=()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
      const url={
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original",
      };
      dispatch(getApiCOnfiguration(url));
    });
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};

  return (
    <div className="app">
      <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/> }/>
          <Route path='/:mediaType/:id' element={<Details/> }/>
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
