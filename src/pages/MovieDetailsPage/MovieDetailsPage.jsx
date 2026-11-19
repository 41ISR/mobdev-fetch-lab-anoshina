import MovieDetails from '../../components/MovieDetails/MovieDetails';
import './MovieDetailsPage.css';
import { useParams } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY


function MovieDetailsPage() {
   const { imdbID } = useParams()

  return (
    <main className="movie-details-page">
      <div className="container">
        <MovieDetails />
      </div>
    </main>
  );
}

export default MovieDetailsPage;
