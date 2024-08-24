import React from 'react'
import './Details.css'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from '../../Components/Details/DetailsBanner/DetailsBanner'
import Cast from '../../Components/Details/Cast/Cast'
import VideosSection from '../../Components/Details/VideoSection/VideoSection'
import Similar from '../../Components/Details/Carousels/Similar'
import Recommendation from '../../Components/Details/Carousels/Recommendation'

const Details = () => {
  const {mediaType,id}=useParams();
  const{data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const{data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)
  
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
