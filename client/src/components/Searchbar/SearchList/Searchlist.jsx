import React from 'react';
import './searchlist.css';
import Searchresult from '../SearchResult/Searchresult';

function Searchlist({ result , inputValue, onClick, displayProperty}) {

  if (inputValue && (!result || result.length === 0)) {
    return <div className="searchlist-wrapper">No results found.</div>;
  }

    return (
      <div className="searchlist-wrapper">
        {result.map((item, index) => (
          <Searchresult key={index} results={item} onClick={onClick} displayProperty={displayProperty} />
        ))}
      </div>
    )
}

export default Searchlist