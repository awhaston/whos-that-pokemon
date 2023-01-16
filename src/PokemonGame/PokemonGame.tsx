import { useEffect, useState } from 'react';
import './PokemonGame.css';

type PokemonOptions = {
	silhouette: boolean;
	generation?: number;
};

function PokemonGame(props: PokemonOptions) {
	const [pokemonImage, setPokemonImage] = useState('');
	const [pokemon, setPokemon] = useState('');
	const [correct, setCorrect] = useState(0);
	const [input, setInput] = useState('');

	useEffect(() => {
		selectRandomPokemon();
	}, []);

	const fetchPokemonData = (indx: number) => {
		const url = `https://pokeapi.co/api/v2/pokemon/${indx}/`;

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();
				setPokemonImage(json.sprites.front_default);
				setPokemon(json.name);
				console.log(json.name);
			} catch (error) {
				console.log('error', error);
			} finally {
				return
			}
		};

		fetchData();
	};

	const selectRandomPokemon = () => {
		const randomIdx = Math.floor(Math.random() * 151) + 1;
		fetchPokemonData(randomIdx);
		console.log('select random');
	};

	const refreshButton = () => {
		selectRandomPokemon();
		setCorrect(0);
	};

	const handelInput = (e: any) => setInput(e.target.value);

	const enterGuess = (e: any) => {
		e.preventDefault();
		const guess = input.toLowerCase();
		if (guess === pokemon) {
			setCorrect(correct + 1);
			setInput('');
			selectRandomPokemon();
			return;
		} else {
			setInput('');
			selectRandomPokemon();
			setCorrect(0);
			return;
		}
	};

	return (
		<div className="pokemon-div">
			<p className="pokemon-correct">Number Correct in a Row: {correct}</p>
			<img src={pokemonImage} className="pokemon-image" />
			<form className="pokemon-form" onSubmit={enterGuess}>
				<input
					className="pokemon-input"
					type="text"
					value={input}
					onChange={handelInput}
				/>
				<button type='button' className="pokemon-button" onClick={refreshButton}>
					New Game
				</button>
				<button type='submit' className="pokemon-button">Submit</button>
			</form>
		</div>
	);
}

export default PokemonGame;
