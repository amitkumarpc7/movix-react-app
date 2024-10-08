import React from 'react'
import './Genres.css'
import { useSelector } from 'react-redux'

const Genres = ({data}) => {
    const {genre}=useSelector(state=>state.home);
  return (
    <div className='genres'>
      {
        data?.map((g)=>{
            if(!genre[g]?.name) return;
            return(
                <div key={g} className="genre">
                    {genre[g]?.name}
                </div>
            )
        })
      }
    </div>
  )
}

export default Genres
