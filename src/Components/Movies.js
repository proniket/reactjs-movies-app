import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios';


export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover: '',
            parr: [1], //This means till now i've loaded only 1 page 
            currPage: 1,
            movies: [],
            favourites: []          
        }
    }
    // At start componentDidMount() will helps us to get the data from api for our homepage
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        //console.log(res);
        let data = res.data;
        console.log(data);
        this.setState({
            movies:[...data.results]
        })
        console.log("mounting done");
    }
    // After that changeMovies() will help us to get the api data with respect to currPage
    changeMovies = async() => {
        console.log('changeMovies Called');
        console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);

        let data = res.data;
        console.log(data);
        this.setState({
            movies: [...data.results]
        })
    }
    // handleRight() will work after clicking the next page button
    // it will first update the state value of parr & currPage then it will call the changeMovies() to get the data with respect to the updated changes in the states
    handleRight = () => {
        console.log('handleRight Called')
        let temparr= [];
        for(let i = 1; i <= this.state.parr.length+1; i++){
            temparr.push(i);
        }
        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage + 1,
        }, this.changeMovies)
    }

    handleLeft = () => {
        if(this.state.currPage != 1){
            console.log('handleLeft Called')
            // let temparr= [];
            // for(let i = 1; i <= this.state.parr.length-1; i++){
            //     temparr.push(i);
            // }
            this.setState({
                //parr: [...temparr], 
                currPage: this.state.currPage-1,
            },this.changeMovies)
        }
    }

    handleClick = (value) => {
        // if(this.state.currPage >= 1){
        //     this.setState({
        //         currPage: value,
        //     },this.changeMovies)
        // }
        if(value != this.state.currPage){
            this.setState({
                currPage: value,
            },this.changeMovies)
        }
    }
     
    handleFavourites= (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m) => m.id!= movie.id)
        }else{
            oldData.push(movie)
        }

        localStorage.setItem("movies-app", JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }

    handleFavouritesState = () => {
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie) => movie.id); // get all movie ids
        this.setState({
            favourites: [...temp]
        })
    }



    render() {
        console.log('render');
       // let movie = movies.results;
        return (
            <>
                {

                    this.state.movies.length === 0 ?
                        <div class="spinner-border text-primary" role="status" >
                            <span class="visually-hidden">Loading...</span>
                        </div > :
                        <div>
                            <h3 className="text-center"><strong>Trending</strong></h3>

                            <div className="movies-list">
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={() => this.setState({hover:  movieObj.id})}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title} />
                                            {/* <div className ="card-body"> */}
                                            <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                            {/* <p className ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                            <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                                {/* Hover Feature */}
                                                { 
                                                    // Method -> 1
                                                    // this.state.hover === movieObj.id ? 
                                                    // <a href="#" className="btn btn-primary movies-button">Add to Favourites</a> :
                                                    // <div>

                                                    // </div>

                                                    // Method -> 2
                                                    this.state.hover === movieObj.id && 
                                                    <a className="btn btn-primary movies-button" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from Favourites" : "Add to Favourites"}
                                                    </a>
                                                }
                                                
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
                {/* Pagination Area */}
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.length <= 2? 

                                this.state.parr.map((value) => (
                                    <li class="page-item"><a class="page-link" onClick={() => {this.handleClick(value)}}>{value}</a></li>

                                )) :
                               <>
                                  <li class="page-item"><a class="page-link" onClick={() => {this.handleClick(this.state.parr[0])}}>{this.state.parr[0]}</a></li>
                                  <li class="page-item"><a class="page-link" onClick={() => {this.handleClick(this.state.parr[1])}}>{this.state.parr[1]}</a></li>
                                </>

                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
