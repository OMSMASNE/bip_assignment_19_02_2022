import React from "react";

import MovieBox from "./movie_box";
import MovieInfo from "./movie_info";

import "./homepage.css";

var MOVIES_API = "https://movie-task.vercel.app/api/popular?page=1";
var MOVIES_SEARCH_API = "https://movie-task.vercel.app/api/search?page=1&query=";

export default class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            current_movie_id: null,
            show_info: false,
            movies_data: null,
            search_value: '',
            filter_value: '',
        };
    }

    componentDidMount()
    {
        let req = new XMLHttpRequest();
        req.open("GET", MOVIES_API);
        req.timeout = 2000;
        req.send();
        req.onload = () => {
            if(req.status !== 200)
            {
                this.movie_loading_problem();
                return;
            }

            let data = JSON.parse(req.response);
            data = data.data.results;

            this.setState({
                movies_data: data
            });
        };

        req.ontimeout = () => {
            this.movie_loading_problem("Request timed out.")
        }

        req.onerror = () => {
            this.movie_loading_problem();
        }
    }

    movie_loading_problem = (msg=null) => {
        let ele = document.getElementById('movie-container-id');
        if(msg)
            ele.innerText = msg;
        else
            ele.innerText = "Error loading movie.";
    }

    showMovie = (m_id) => {
        this.setState({
            show_info: true,
            current_movie_id: m_id
        });
    }

    close_movie_info = () => {
        this.setState({
            show_info: false,
            current_movie_id: null
        });
    }

    handleChange1 = (event) => {
        this.setState({search_value: event.target.value});
    }

    handleChange2 = (event) => {
        this.setState({filter_value: event.target.value});
    }

    search_for_movies = (event) => {
        event.preventDefault();
        let search_query = this.state.search_value;
        if(search_query === '')
        {
            alert("Enter search value.");
            return;
        }

        let req = new XMLHttpRequest();
        req.open("GET", MOVIES_SEARCH_API + search_query);
        req.timeout = 2000;
        req.send();
        req.onload = () => {
            if(req.status !== 200)
            {
                this.movie_loading_problem();
                return;
            }

            let data = JSON.parse(req.response);

            data = data.data.results;

            this.setState({
                movies_data: data
            });
        };

        req.ontimeout = () => {
            this.movie_loading_problem("Request timed out.")
        }

        req.onerror = () => {
            this.movie_loading_problem();
        }
    }

    filter_movies = (event) => {
        event.preventDefault();
        let filter_query = parseInt(this.state.filter_value);

        let new_list = [];

        for(let i = 0; i < this.state.movies_data.length; i++)
        {
            let d = new Date(this.state.movies_data[i].release_date);
            let year = d.getFullYear();

            if(year === filter_query)
            {
                new_list.push(this.state.movies_data[i]);
            }
        }

        if(new_list.length === 0)
        {
            alert("No movies found.");
            return;
        }

        this.setState({movies_data: new_list});
    }

    render()
    {
        return (
            <div className="main-page">
                <div className="h2 mx-auto mb-2">Bip Movies Assignment</div>

                <div id="search-bar" className="mx-auto my-2">
                    <form onSubmit={this.search_for_movies}>
                        <input
                            value={this.state.search_value}
                            className="mr-2"
                            onChange={this.handleChange1}
                            type="text" />
                        <button className="btn btn-warning" type="submit">Search by title</button>
                    </form>
                </div>

                <div id="search-bar" className="mx-auto mb-5">
                    <form onSubmit={this.filter_movies}>
                        <input
                            value={this.state.filter_value}
                            className="mr-2"
                            onChange={this.handleChange2}
                            type="text" />
                        <button className="btn btn-warning" type="submit">Filter by year from current movies list</button>
                    </form>
                </div>

                <hr />

                <div className="movie-container mx-auto card-deck" id="movie-container-id">
                    {
                        this.state.movies_data ? (
                            this.state.movies_data.map((item, i) => {
                                return <MovieBox
                                    key={i}
                                    m_id={item.id}
                                    title={item.title}
                                    release_date={item.release_date}
                                    vote_count={item.vote_count}
                                    vote_average={item.vote_average}
                                    language={item.original_language}
                                    img={item.backdrop_path}
                                    adult={item.adult}
                                    overview={item.overview}
                                    show_movie_info={this.showMovie}
                                />
                            })
                        )
                        :
                        <div className="movies-loader mx-auto">Loading a list of movies.</div>
                    }
                </div>

                {
                    this.state.show_info ? (
                        <MovieInfo
                            m_id={this.state.current_movie_id}
                            close_movie_info = {this.close_movie_info}
                        />
                    )
                    :
                    ""
                }
            </div>
        );
    }
}
