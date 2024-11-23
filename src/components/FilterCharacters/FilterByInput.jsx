import React, { useRef } from 'react'

const FilterByInput = ({setFuction, value, placeholder}) => {
  const searchCont = useRef(null);

  const customFocus = () => {
    if (searchCont.current) {
      searchCont.current.classList.add('focused');
    }
  };

  const customBlur = () => {
    if (searchCont.current) {
      searchCont.current.classList.remove('focused');
    }
  };
  
  return (
    <div className="episode__filter_cont" ref={searchCont}>
      <div className="search__icon" ></div>
      <input 
      className="episode__filter" 
      type="text" onFocus={customFocus} 
      onBlur={customBlur} 
      onChange={e => setFuction(e.target.value)}  
      value={value} placeholder={placeholder} />
    </div>
  )
}

export default FilterByInput