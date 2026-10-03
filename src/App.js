import React, { useState } from 'react';
import './App.css';
import { moviesData } from './moviesData';
import MovieList from './components/MovieList';
import SeatPicker from './components/SeatPicker';
import BookingForm from './components/BookingForm';
import Summary from './components/Summary';

const occupiedSeats = ["1-3", "1-8", "2-7", "3-1", "3-5", "4-4", "4-7", "6-2", "6-6"];

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Wszystkie");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingSummary, setBookingSummary] = useState(null);

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

  const handleReset = () => {
    setSelectedMovie(null);
    setSelectedShowtime("");
    setSelectedSeats([]);
    setBookingSummary(null);
  };

  const handleBookingSubmit = (formData) => {
    setBookingSummary({
      movie: selectedMovie.title,
      showtime: selectedShowtime,
      seats: selectedSeats,
      ...formData
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Kino - Panel Rezerwacji Miejsc</h1>
      </header>

      {!selectedMovie && (
        <MovieList 
          movies={moviesData}
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          onSelectMovie={handleSelectMovie}
        />
      )}

      {selectedMovie && !bookingSummary && (
        <div>
          <button className="btn btn-secondary" onClick={handleReset}>
            ← Wróć do listy filmów
          </button>

          <div className="movie-selected-info">
            <h2>{selectedMovie.title}</h2>
            <p>
              <strong>Godzina seansu:</strong> {selectedShowtime} | <strong>Czas trwania:</strong> {selectedMovie.duration} min
            </p>
          </div>

          <SeatPicker 
            occupiedSeats={occupiedSeats}
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
          />

          <BookingForm 
            selectedSeats={selectedSeats}
            onSubmitBooking={handleBookingSubmit}
          />
        </div>
      )}

      {bookingSummary && (
        <Summary 
          bookingSummary={bookingSummary}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
