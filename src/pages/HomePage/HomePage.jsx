import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import './HomePage.css';


function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    setError(null);
    setIsLoading(true);

    try {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'False') {
        setError(data.Error);
        setMovies([]);
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError('Не удалось связаться с сервером');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar value={query} onChange={setQuery} />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
   
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && <MovieList movies={movies} />}

        </section>
      </div>
    </main>
  );
}

export default HomePage;
