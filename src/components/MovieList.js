import React from 'react';

function MovieList({ movies, search, setSearch, genre, setGenre, onSelectMovie }) {
    const filteredMovies = movies.filter(movie => {
        const matchTitle = movie.title.toLowerCase().includes(search.toLowerCase());
        const matchGenre = genre === "Wszystkie" || movie.genre === genre;
        return matchTitle && matchGenre;
    });

    return (
    <div>
        <div style={{ marginBottom: '20px' }}>
            <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Szukaj filmu..." 
            />

        <select value={genre} onChange={e => setGenre(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="Wszystkie">Wszystkie gatunki</option>
            <option value="Dramat">Dramat</option>
            <option value="Gangsterski">Gangsterski</option>
            <option value="Komedia">Komedia</option>
            <option value="Psychologiczny">Psychologiczny</option>
        </select>
        </div>

        {filteredMovies.map(movie => (
        <div key={movie.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <img src={movie.poster} alt={movie.title} style={{ width: '140px', height: '200px' }} />
            <div>
                <h3>{movie.title}</h3>
                <p>{movie.genre} | {movie.duration} min</p>
                <p>{movie.description}</p>
            
                <p><strong>Wybierz seans:</strong></p>
                {movie.showtimes.map(time => (
                    <button key={time} onClick={() => onSelectMovie(movie, time)} style={{ marginRight: '5px' }}>
                {time}
                </button>
            ))}
            </div>
        </div>
        ))}
    </div>
  );
}

export default MovieList;
