import React, { useState, useEffect } from 'react';

function BookingForm({ selectedSeats, onSubmitBooking }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("normal");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState({});

  const selectedSeatsCount = selectedSeats.length;

  useEffect(() => {
    const pricePerTicket = ticketType === "normal" ? 25 : 18;
    setTotalPrice(selectedSeatsCount * pricePerTicket);
  }, [selectedSeatsCount, ticketType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "Imię jest wymagane.";
    if (!lastName.trim()) newErrors.lastName = "Nazwisko jest wymagane.";
    
    if (!email.trim()) {
      newErrors.email = "Adres e-mail jest wymagany.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Nieprawidłowy format adresu e-mail.";
    }

    if (selectedSeatsCount === 0) {
      newErrors.seats = "Musisz wybrać przynajmniej jedno miejsce na sali.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmitBooking({
        firstName,
        lastName,
        email,
        ticketType: ticketType === "normal" ? "Normalny (25 zł)" : "Ulgowy (18 zł)",
        totalPrice
      });
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ 
        backgroundColor: '#e9ecef', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <p style={{ margin: '5px 0' }}>
          <strong>Wybrane miejsca:</strong> {selectedSeatsCount > 0 
            ? selectedSeats.map(seat => {
                const [r, s] = seat.split('-');
                return `Rząd ${r}, Miejsce ${s}`;
              }).join(' | ') 
            : 'Brak wybranych miejsc'}
        </p>
        <p style={{ margin: '5px 0' }}>
          <strong>Liczba biletów:</strong> {selectedSeatsCount} szt.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <div>
          <label style={{ fontWeight: 'bold' }}>Rodzaj biletu: </label>
          <select 
            value={ticketType} 
            onChange={e => setTicketType(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', marginLeft: '8px' }}
          >
            <option value="normal">Normalny - 25 zł</option>
            <option value="reduced">Ulgowy - 18 zł</option>
          </select>
        </div>

        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
          Łączna cena: {totalPrice} zł
        </div>

        {errors.seats && <span style={{ color: 'red', fontWeight: 'bold' }}>{errors.seats}</span>}

        <div>
          <label style={{ display: 'block' }}>Imię:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {errors.firstName && <span style={{ color: 'red', fontSize: '14px' }}>{errors.firstName}</span>}
        </div>

        <div>
          <label style={{ display: 'block' }}>Nazwisko:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {errors.lastName && <span style={{ color: 'red', fontSize: '14px' }}>{errors.lastName}</span>}
        </div>

        <div>
          <label style={{ display: 'block' }}>E-mail:</label>
          <input 
            type="text" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer', 
            fontSize: '16px',
            fontWeight: 'bold' 
          }}
        >
          Zatwierdź rezerwację
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
