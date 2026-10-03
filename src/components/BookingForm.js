import React, { useState, useEffect } from 'react';

function BookingForm({ selectedSeatsCount, onSubmitBooking }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("normal");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState({});

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
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3>Formularz rezerwacji</h3>

      <div>
        <label>Rodzaj biletu: </label>
        <select value={ticketType} onChange={e => setTicketType(e.target.value)}>
          <option value="normal">Normalny - 25 zł</option>
          <option value="reduced">Ulgowy - 18 zł</option>
        </select>
      </div>

      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Łączna cena: {totalPrice} zł
      </div>

      {errors.seats && <span style={{ color: 'red' }}>{errors.seats}</span>}

      <div>
        <label style={{ display: 'block' }}>Imię:</label>
        <input 
          type="text" 
          value={firstName} 
          onChange={e => setFirstName(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.firstName && <span style={{ color: 'red', fontSize: '14px' }}>{errors.firstName}</span>}
      </div>

      <div>
        <label style={{ display: 'block' }}>Nazwisko:</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={e => setLastName(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.lastName && <span style={{ color: 'red', fontSize: '14px' }}>{errors.lastName}</span>}
      </div>

      <div>
        <label style={{ display: 'block' }}>E-mail:</label>
        <input 
          type="text" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
      </div>

      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
        Zatwierdź rezerwację
      </button>
    </form>
  );
}

export default BookingForm;
