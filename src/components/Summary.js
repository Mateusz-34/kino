import React from 'react';

function Summary({ bookingSummary, onReset }) {
  return (
    <div className="summary-container">
      <h2>✔ Rezerwacja została potwierdzona!</h2>
      <hr />
      
      <div className="summary-details">
        <p><strong>Film:</strong> {bookingSummary.movie}</p>
        <p><strong>Godzina seansu:</strong> {bookingSummary.showtime}</p>
        <p>
          <strong>Wybrane miejsca:</strong>{' '}
          {bookingSummary.seats.map(seat => {
            const [r, s] = seat.split('-');
            return `Rząd ${r}, Miejsce ${s}`;
          }).join(' | ')}
        </p>
        <p><strong>Imię i nazwisko:</strong> {bookingSummary.firstName} {bookingSummary.lastName}</p>
        <p><strong>Adres e-mail:</strong> {bookingSummary.email}</p>
        <p><strong>Rodzaj biletu:</strong> {bookingSummary.ticketType}</p>
        <p className="summary-price">
          <strong>Łączna kwota do zapłaty:</strong> {bookingSummary.totalPrice} zł
        </p>
      </div>

      <button className="btn btn-primary" onClick={onReset}>
        Zrób kolejną rezerwację
      </button>
    </div>
  );
}

export default Summary;
