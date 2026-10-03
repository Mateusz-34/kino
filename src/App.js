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
    <div style={{ padding: '20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Kino - Panel Rezerwacji Miejsc</h1>
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
          <button 
            onClick={handleReset}
            style={{ 
              padding: '8px 15px', 
              cursor: 'pointer', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginBottom: '15px' 
            }}
          >
            ← Wróć do listy filmów
          </button>

          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>{selectedMovie.title}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#555' }}>
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
        <div style={{ 
          border: '2px solid #28a745', 
          backgroundColor: '#f4fbf7', 
          padding: '25px', 
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ color: '#28a745', marginTop: 0 }}>✔ Rezerwacja została potwierdzona!</h2>
          <hr style={{ border: 'none', borderTop: '1px solid #ced4da', margin: '15px 0' }} />
          
          <div style={{ lineHeight: '1.8' }}>
            <p><strong>Film:</strong> {bookingSummary.movie}</p>
            <p><strong>Godzina:</strong> {bookingSummary.showtime}</p>
            <p><strong>Miejsca:</strong> {bookingSummary.seats.join(", ")}</p>
            <p><strong>Imię i nazwisko:</strong> {bookingSummary.firstName} {bookingSummary.lastName}</p>
            <p><strong>E-mail:</strong> {bookingSummary.email}</p>
            <p><strong>Rodzaj biletu:</strong> {bookingSummary.ticketType}</p>
            <p style={{ fontSize: '18px', color: '#155724' }}>
              <strong>Łączna kwota do zapłaty:</strong> {bookingSummary.totalPrice} zł
            </p>
          </div>

          <button 
            onClick={handleReset}
            style={{ 
              marginTop: '15px', 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Zrób kolejną rezerwację
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
