import React, { useState } from 'react';
import { moviesData } from './moviesData';
import MovieList from './components/MovieList';
import SeatPicker from './components/SeatPicker';
import BookingForm from './components/BookingForm';

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

  const handleBack = () => {
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
      ) : bookingSummary ? (
        <div style={{ border: '2px solid #4CAF50', padding: '20px', borderRadius: '8px' }}>
          <h2>Podsumowanie rezerwacji</h2>
          <p><strong>Film:</strong> {bookingSummary.movie}</p>
          <p><strong>Godzina:</strong> {bookingSummary.showtime}</p>
          <p><strong>Miejsca:</strong> {bookingSummary.seats.join(", ")}</p>
          <p><strong>Imię i nazwisko:</strong> {bookingSummary.firstName} {bookingSummary.lastName}</p>
          <p><strong>E-mail:</strong> {bookingSummary.email}</p>
          <p><strong>Typ biletu:</strong> {bookingSummary.ticketType}</p>
          <p><strong>Cena całkowita:</strong> {bookingSummary.totalPrice} zł</p>
          <button onClick={handleBack}>Wróć do strony głównej</button>
        </div>
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

          <BookingForm 
            selectedSeatsCount={selectedSeats.length}
            onSubmitBooking={handleBookingSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default App;
