import React from 'react';
import "./Movie.css";

const Movie = (props) => {
    return (
        <div className="ui raised card">
            <div className="content">
                <div className="header">{props.name}</div>
                <div className="meta"><a href={props.wiki} target="blank">Wikipedia</a></div>
                <div className="meta"><a href={props.trailer} target="blank">Trailer</a></div>
                <div>{props.teaser}</div>
            </div>
        </div>
    )
}

export default Movie;