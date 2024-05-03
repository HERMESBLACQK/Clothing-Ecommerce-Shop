import React from 'react'

const SectionTitle = ({title, path}) => {
  return (
    <div className='section-title-div border-b py-4 border-gray-600 bgc'>
        <h1 className='section-title-title text-4xl text-center max-md:text-4xl max-sm:text-2xl text-accent-content'>{ title }</h1>
        <p className='section-title-path text-2xl text-center max-sm:text-xl text-accent-content'>{ path }</p>
    </div>
  )
}

export default SectionTitle