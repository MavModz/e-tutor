import React from 'react';
import './Searchresult.css';

function Searchresult({ results, onClick }) {

  return (
    <div className="search-result-item" onClick={() => onClick(results)} >
      {results.categoryName}
    </div>
  )
}

export default Searchresult