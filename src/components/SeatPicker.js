import React from 'react';

const rows = [1, 2, 3, 4, 5, 6];
const seatsPerRow = [1, 2, 3, 4, 5, 6, 7, 8];

function SeatPicker({ occupiedSeats, selectedSeats, onToggleSeat }) {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h3 style={{ background: '#333', color: '#fff', padding: '5px', width: '280px', margin: '0 auto 20px' }}>
        EKRAN
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        {rows.map(r => (
          <div key={r} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', width: '20px' }}>{r}</span>
            {seatsPerRow.map(s => {
              const id = `${r}-${s}`;

              let backgroundColor = '#4CAF50';
              if (occupiedSeats.includes(id)) backgroundColor = '#f44336';
              if (selectedSeats.includes(id)) backgroundColor = '#2196F3';

              return (
                <button
                  key={id}
                  onClick={() => onToggleSeat(id)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: backgroundColor,
                    cursor: occupiedSeats.includes(id) ? 'not-allowed' : 'pointer'
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <span><span style={{ color: '#4CAF50' }}>●</span> Wolne</span>
        <span><span style={{ color: '#f44336' }}>●</span> Zajęte</span>
        <span><span style={{ color: '#2196F3' }}>●</span> Wybrane</span>
      </div>
    </div>
  );
}

export default SeatPicker;
