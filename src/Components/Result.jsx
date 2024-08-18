import React from 'react'

export default function Result(props) {
    const boxes = props.movies.map(
        (item, index) => {
            return <Box key={index} image={item.poster_path} title={item.original_title} rating={item.vote_average} />
        }
    )
    return (
        <div className='w-full grid md:grid-cols-4 gap-6'>
            {boxes}
        </div>
    )
}


const Box = (props) => {
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  
  return (
      <div className='shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out'>
          <div className='relative'>
              <img 
                  src={IMGPATH + props.image} 
                  alt={props.title} 
                  className='w-full h-70 object-cover object-center'
              />
              <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center text-white text-xl'>
                  {props.title}
              </div>
          </div>
          <div className='p-4 flex justify-between items-center bg-gray-800'>
              <span className='text-lg font-semibold text-white truncate'>{props.title}</span>
              <span className='text-lg text-yellow-500 font-bold'>{props.rating}</span>
          </div>
      </div>
  )
}
