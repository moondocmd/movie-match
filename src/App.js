import axios from "axios";
import React from "react";
import './App.css';
import Movie from './Movie';

class App extends React.Component {
  constructor() {
      super()
      this.state = {
        query: '',
        movies: []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    let mov = event.target.movieInput.value;
    console.log("Searching for: ", mov);
    this.setState( { query: mov }, () => { this.searchMovie() });
  }

  searchMovie(){
    axios.get(`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${this.state.query}&&verbose=1`).then(response =>{
      const movies = response.data;
      console.log(movies.Similar.Info[0].Name);
      this.setState({ movies: movies.Similar.Results })
    })
  }

  render() {
    // Name: "Transformers"
    // Type: "movie"
    // wTeaser: "Transformers is a 2007 American science fiction action film based on the Transformers toy line. The film, which combines computer animation with live-action filming, was directed by Michael Bay, with Steven Spielberg serving as executive producer. It was produced by Don Murphy and Tom DeSanto, and is the first installment in the live-action Transformers film series. The film stars Shia LaBeouf as Sam Witwicky, a teenager who gets caught up in a war between the heroic Autobots and the villainous Decepticons, two factions of alien robots who can disguise themselves by transforming into everyday machinery, primarily vehicles. The Autobots intend to retrieve and use the AllSpark, the object that created their robotic race that is on Earth, to rebuild their home planet Cybertron and end the war, while the Decepticons have the intention of using it to build an army by giving life to the machines of Earth. Tyrese Gibson, Josh Duhamel, Anthony Anderson, Megan Fox, Rachael Taylor, John Turturro, and Jon Voight also star, while voice actors Peter Cullen and Hugo Weaving voice Optimus Prime and Megatron respectively."
    // wUrl: "http://en.wikipedia.org/wiki/Transformers_(film)"
    // yID: "dxQxgAfNzyE"
    // yUrl: "https://www.youtube-nocookie.com/embed/dxQxgAfNzyE"
    const movies = this.state.movies.map(movie => {
      return <Movie
              name = {movie.Name}
              teaser = {movie.wTeaser}
              wiki = {movie.wUrl}
              trailer = {movie.yUrl}
            />
    })
    
    return ( 
      <div className="container">
        <div className="ui borderless main menu">
          <h2 className="ui header">
            Movie-Match
            <div className="sub header">Enter a movie to see similar titles</div>
          </h2>
          <form id="movieForm" onSubmit={this.handleSubmit}>
            <div className="ui small icon input">
              <input type="text" id="movieInput" name="movieInput" placeholder="Search for a Movie..." />
              <i className="search icon"></i>
            </div>
            <button className="ui button" id="submitButton" type="submit" >Submit</button>
            {this.state.query !== '' && <p>Movies similar to: {this.state.query}</p>}
          </form>
        </div>
        <div className="movie-container">
          {movies}
        </div>
      </div>
    )
  }
}

export default App;