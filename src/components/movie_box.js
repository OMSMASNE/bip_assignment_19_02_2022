import React from "react";

import "./styles.css";

let MOVIE_POSTER_API = "https://image.tmdb.org/t/p/original";

export default class MovieBox extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    process_img()
    {
        return (MOVIE_POSTER_API + this.props.img);
        // return "https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png";
    }

    process_overview()
    {
        let overview = this.props.overview;
        if(overview.length > 50)
        {
            overview = overview.substr(0, 50-1);
            overview += "...";
        }
        return overview;
    }

    show_movie_info = () => {
        this.props.show_movie_info(this.props.m_id);
    }

    render()
    {
        return (
            <div
                onClick={this.show_movie_info}
                className="m-container card border-primary mx-3 my-3"
                style={{
                    maxWidth: "20rem"
                }}
                id={this.props.m_id}
            >
                <img
                    className="card-img-top movie-poster-img"
                    src={this.process_img()}
                    alt="Movie poster"
                />
                <div className="card-body">
                    <h4 className="m-title card-title">{this.props.title}</h4>
                    <p className="m-release-date card-text">Released on: {this.props.release_date}</p>
                    <hr />
                    <p className="m-vote card-text h-25">{this.process_overview()}</p>
                    <hr />
                    <p className="m-vote card-text">Viewer opinion: {this.props.vote_average} / {this.props.vote_count}</p>
                    <p className="m-language card-text">Language: {this.props.language}</p>
                </div>
            </div>
        )
    }
}
