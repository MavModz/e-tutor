import React from 'react';
import './searchresult.css';

function Searchresult({ results, onClick, displayProperty }) {

  return (
    <div className="search-result-item" onClick={() => onClick(results)} >
      {results[displayProperty]}
    </div>
  )
}

export default Searchresult;
