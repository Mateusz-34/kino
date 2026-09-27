import React, { useState } from 'react';
import { moviesData } from './moviesData';
import MovieList from './components/MovieList';

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Wszystkie");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");

  const handleSelectMovie = (movie, time) => {
    setSelectedMovie(movie);
    setSelectedShowtime(time);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Kino - Rezerwacja Biletów</h1>

      {!selectedMovie ? (
        <MovieList 
          movies={moviesData}
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          onSelectMovie={handleSelectMovie}
        />
      ) : (
        <div>
          <button onClick={() => setSelectedMovie(null)}>← Wróć do filmów</button>
          <h2>Wybrany film: {selectedMovie.title} ({selectedShowtime})</h2>
        </div>
      )}
    </div>
  );
}

export default App;
