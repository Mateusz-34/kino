import React, { useState } from 'react';
import { moviesData } from './moviesData';
import MovieList from './components/MovieList';
import SeatPicker from './components/SeatPicker';

const occupiedSeats = ["1-3", "1-8", "2-7", "3-1", "3-5", "4-4", "4-7", "6-2", "6-6"];

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Wszystkie");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectMovie = (movie, time) => {
    setSelectedMovie(movie);
    setSelectedShowtime(time);
  };

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBack = () => {
    setSelectedMovie(null);
    setSelectedShowtime("");
    setSelectedSeats([]);
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
          <button onClick={handleBack}>← Wróć do filmów</button>
          <h2>Wybrany film: {selectedMovie.title} ({selectedShowtime})</h2>

          <SeatPicker 
            occupiedSeats={occupiedSeats}
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
          />

          <p>Liczba wybranych miejsc: <strong>{selectedSeats.length}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
