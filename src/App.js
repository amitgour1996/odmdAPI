import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';

const App = (props) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null)

  const onSubmitHandler = () => {
    if (value.trim() === ""){
      alert("Movie name cannot be empty!");
      return;
    }
    setData(null)
    $.ajax({
      url: `https://www.omdbapi.com/?t=${value}&apikey=daf780cf`,
      dataType: 'json',
      success: (data) => {
        console.log(data);
        setData(data);
      }
    })
  }

  let searchResult = null;

  if (data){
    if (data.Error){
      searchResult = <h1>{data.Error}</h1>
    }
    else {
      searchResult = (
        <div className = "searchResult">
          <div className = "poster">
            <img src={data.Poster} alt="Poster"/>
          </div>
    
          <div>
            <h1>{data.Title}</h1>
            <div className="details">
              <p><strong>Release date</strong></p>
              <p>{data.Released}</p>
              <p><strong>Director</strong></p> 
              <p>{data.Director}</p>
              <p><strong>IMDB rating</strong></p> 
              <p>{data.imdbRating}</p>
              <p><strong>Genre</strong></p> 
              <p>{data.Genre}</p>
            </div>
          </div>
        </div>
      );
  
    }
  }

  return (
    <React.Fragment>
      <div className = "search">
        <input 
          type = "text" 
          placeholder = "Enter movie name"
          value = {value}
          onChange = {(event)=> setValue(event.target.value)} 
        />
        <button onClick = {onSubmitHandler}>Search</button>
      </div>

      {searchResult}
    </React.Fragment>
  )
}

export default App;
