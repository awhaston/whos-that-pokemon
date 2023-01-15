import { useEffect, useState } from 'react';
import PokemonGame from './PokemonGame/PokemonGame';
import PokemonMenu from './PokemonMenu/PokemonMenu';
import './App.css';

function App() {
	const [play, setPlay] = useState(false);

	return (
		<>
			<h1>Who's That Pokemon?</h1>

			{!play ? (
				<div className="app-play"><span onClick={(e) => setPlay(!play)}>Press to Play!</span></div>
			) : (
				<PokemonGame silhouette={true} />
			)}
		</>
	);
}

export default App;
