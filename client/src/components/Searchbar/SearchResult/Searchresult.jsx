import React from 'react';
import './Searchresult.css';

// Pass an additional prop 'displayProperty' to specify what to display
function Searchresult({ results, onClick, displayProperty }) {

  return (
    <div className="search-result-item" onClick={() => onClick(results)} >
      {results[displayProperty]}
    </div>
  )
}

export default Searchresult;
