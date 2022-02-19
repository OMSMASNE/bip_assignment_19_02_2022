import React from "react";
import "./styles.css";

let MOVIE_POSTER_API = "https://image.tmdb.org/t/p/original";
let MOVIE_DETAILS_API = "https://movie-task.vercel.app/api/movie?movieId=";

export default class MovieInfo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            request_complete: false,
            response_success: false,
            title: null,
            release_date: null,
            img: null,
            language: null,
            overview: null,
            vote_average: null,
            vote_count: null,
            budget: null,
            adult: null,
            runtime: null
        };
    }

    componentDidMount()
    {
        this.fetch_details();
    }

    fetch_details = () => {
        let req = new XMLHttpRequest();
        req.open("GET", MOVIE_DETAILS_API + this.props.m_id);
        req.send();
        req.onload = () => {
            if(req.status != 200)
            {
                this.setState({
                    request_complete: true,
                    response_success: false
                });
                return;
            }

            let data = JSON.parse(req.response);
            data = data.data;
            // console.log(data);

            this.setState({
                request_complete: true,
                response_success: false,
                title: data.title,
                release_date: data.release_date,
                img: data.backdrop_path,
                overview: data.overview,
                vote_average: data.vote_average,
                vote_count: data.vote_count,
                budget: data.budget,
                adult: data.adult,
                runtime: data.runtime
            });
        }
    }

    close_modal = () => {
        this.props.close_movie_info();
    }

    process_img = () => {
        return (MOVIE_POSTER_API + this.state.img);
        // return "https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png";
    }

    render()
    { 
        return (
            <div id="myModal" className="movie-modal">
                <div className="movie-modal-content">
                    {this.state.request_complete ? (
                    <>
                        <img
                            className="movie-poster-img"
                            src={this.process_img()}
                            alt="Movie Poster"
                        />
                        <div className="movie-modal-header">
                            <span className="movie-close" onClick={this.close_modal}>&times;</span>
                            <h2 className="movie-modal-title">{this.state.title}</h2>
                        </div>
                        <div className="movie-modal-body">
                            <div className="m-release-date mt-2">Released on: {this.state.release_date}</div>
                            <hr />
                            <p className="m-vote mt-2 mb-2">{this.state.overview}</p>
                            <hr />
                            <p className="m-vote mt-2 mb-2">Viewer opinion: {this.state.vote_average} / {this.state.vote_count}</p>
                            <p className="m-vote mt-2 mb-2">Budget: {this.state.budget}</p>
                            <p className="m-vote mt-2 mb-2">Adult:  {this.state.adult ? "YES" : "NO"}</p>
                            <p className="m-vote mt-2 mb-2">Runtime: {this.state.runtime}</p>
                        </div>
                    </>
                    ) : (
                        <h2>Loading details.</h2>
                    )}

                </div>
            </div>
        )
    };
}
