import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import YouTube from 'react-youtube';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const API_URL = "https://api.themoviedb.org/3"
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [selectedMovie, setSelectedMovie] = useState({})
  const [playerTrailer, setPlayerTrailer] = useState(false)

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover"
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: 'ac0f97591cfb6d7272c24889e3b53834',
        query: searchKey
      }
    })


    setMovies(results)
    await selectMovie(results[1])



  }
  useEffect(() => {
    fetchMovies()
  }, [])
  const fetchMovie = async (id) => {

    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: 'ac0f97591cfb6d7272c24889e3b53834',
        append_to_response: 'videos'

      }

    })


    return data

  }

  const selectMovie = async (movie) => {

    const data = await fetchMovie(movie.id)

    setSelectedMovie(data)
    console.log('data', data)
  }



  const renderMovies = () => (
    movies.map((movie) => <MovieCard key={movie.id} movie={movie}
      selectMovie={selectMovie} />)

  )
  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)
  }
  const renderTrailer = () => {


    const trailer = selectedMovie.videos.results.find(vid => vid.name === "Official Trailer")
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key


    return (<YouTube
      videoId={key}
      className={'youtube-container'}

      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0
        }
      }}
    />

    )
  }

  return (
    <div className='App'>
      <header className='header max-center'>
        <div className='header-content max-center'>

          <span>Movie Trailer App </span>
          <form onSubmit={searchMovies}>
            <input type='text' onChange={(e) => setSearchKey(e.target.value)} />
            <button type='submit'>Search!</button>
          </form></div>
      </header>
      <div className='hero  max-center' style={{ background: `url(${IMAGE_PATH}${selectedMovie.backdrop_path})` }}>
        <div className='hero-content max-center' >
          {playerTrailer ? < button onClick={() => setPlayerTrailer(false)} className='button button-close'>Close</button> : null}
          {selectedMovie.videos && playerTrailer ? renderTrailer() : null}
          <button className='button' onClick={() => setPlayerTrailer(true)}>Play Trailer</button>
          <h1 className='hero-title'>{selectedMovie.title}</h1>
          <p className='overview'>{selectedMovie.overview ? selectedMovie.overview : null}</p>


        </div>
      </div>



      <div className='container max-center'>
        {renderMovies()}

      </div>
    </div>
  );
}

export default App;
