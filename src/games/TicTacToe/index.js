import React, { useState, useEffect, useRef } from "react";
import "../../styles/App.css";
import Block from "../../components/Block.js";
import Result from "../../components/Result.js";

/**
 * TicTacToe Game Main Component
 * @returns {JSX.Element}
 * @constructor
 */
function TicTacToe() {
	const [blockSize, setBlockSize] = useState([3, 3]);
	const [currentPlayer, setCurrentPlayer] = useState("one");
	const [numberOfPlayers, setNumberOfPlayers] = useState(2);
	const [isGameOver, setIsGameOver] = useState(false);
	const [playerWinningCount, setPlayerWinningCount] = useState({
		first: 0,
		second: 0,
	});
	const [gameResult, setGameResult] = useState(
		new Array(blockSize[0] * blockSize[1]).fill(0)
	);
	const success = useRef([
		"123",
		"456",
		"789",
		"147",
		"258",
		"369",
		"159",
		"357",
		"753",
		"951",
		"963",
		"852",
		"741",
		"987",
		"654",
		"321",
	]);
	const isComputerPlaying = numberOfPlayers === 1;
	console.log("success", success.current);

	/* Enable Computer Play */
	useEffect(() => {
		// TODO: Make the computer play randomly
		if (!isGameOver && isComputerPlaying && currentPlayer === "two") {
			let newResult = [...gameResult];
			let opponentWinningBlockIndex;
			success.current.forEach((pattern) => {
				let count = 0;
				pattern.split("").forEach((block) => {
					const blockIndex = gameResult[parseInt(block) - 1];
					if (count === 2 && gameResult[blockIndex] === 0) {
						opponentWinningBlockIndex = blockIndex;
					} else if (gameResult[blockIndex] === "one") {
						count++;
					}
				});
			});
			// Check if the opponent is about to win & block them at the winning block
			if (opponentWinningBlockIndex) {
				newResult[opponentWinningBlockIndex] = "two";
				setGameResult(newResult);
			} else {
				// If the opponent is not about to win, then play randomly
				let availableBlocks = gameResult.filter((blockValue) => {
					if (blockValue === 0) {
						return true;
					}
					return false;
				});
				if (availableBlocks.length > 0) {
					let random =
						Math.ceil(Math.random() * (availableBlocks.length - 1)) || 0;
					newResult[random] = "two";
					setGameResult(newResult);
				}
			}
		}
	}, [currentPlayer]);

	/* Check for Game Over */
	useEffect(() => {
		let playerWhoWon, wonPattern;
		// TODO: Only Run if there was a three entries atleast from each player!
		wonPattern = success.current.find((pattern) => {
			let digits = pattern.split("");
			let playerOne = 0,
				playerTwo = 0;
			playerWhoWon = digits.reduce((prev, digit) => {
				if (gameResult[digit - 1] === "one") {
					playerOne++;
				} else if (gameResult[digit - 1] === "two") {
					playerTwo++;
				}
				return playerOne === 3 ? "one" : playerTwo === 3 ? "two" : null;
			}, null);
			if (playerWhoWon) {
				return true;
			}
			return false;
		});
		if (!isGameOver && wonPattern && playerWhoWon) {
			wonPattern.split("").forEach((block) => {
				const element = document.querySelector(
					`[name="${parseInt(block) - 1}"]`
				);
				element.style.borderColor = "greenyellow";
				element.style.borderWidth = "6px";
			});
			setTimeout(() => {
				setPlayerWinningCount({
					...playerWinningCount,
					[playerWhoWon === "one" ? "first" : "second"]:
						playerWinningCount[playerWhoWon === "one" ? "first" : "second"] + 1,
				});
				setGameResult(new Array(blockSize[0] * blockSize[1]).fill(0));
				setCurrentPlayer("one");
				wonPattern.split("").forEach((block) => {
					const element = document.querySelector(
						`[name="${parseInt(block) - 1}"]`
					);
					element.style.borderColor = "black";
					element.style.borderWidth = "3px";
				});
			}, 2000);
		}
	}, [gameResult]);

	/* Game's Event Handler */
	const updateTheGame = (event) => {
		event.preventDefault();
		const eventType = event.currentTarget.getAttribute("data-event");
		if (eventType === "play") {
			let blockNumber = parseInt(event.currentTarget.name);
			if (!isGameOver && gameResult[blockNumber] === 0) {
				setGameResult((prevResult) => {
					let newResult = [...prevResult];
					newResult[blockNumber] = currentPlayer;
					return newResult;
				});
				setCurrentPlayer((prevPlayer) =>
					prevPlayer === "one" ? "two" : "one"
				);
			}
		} else if (eventType === "resetScores") {
			setPlayerWinningCount({
				first: 0,
				second: 0,
			});
		} else if (eventType === "setNumberOfPlayers") {
			// Reset the game state, if the number of players changes
			setPlayerWinningCount({
				first: 0,
				second: 0,
			});
			setGameResult(new Array(blockSize[0] * blockSize[1]).fill(0));
			setCurrentPlayer("one");
			setIsGameOver(false);
			setNumberOfPlayers(event.target.value);
		} else {
			setGameResult(new Array(blockSize[0] * blockSize[1]).fill(0));
			setCurrentPlayer("one");
		}
	};

	return (
		<div className="basic">
			<div className="gameContainer centerText">
				<h3>{"Tic Tac Toe"}</h3>
				<table>
					<tbody>
						{new Array(blockSize[0]).fill(0).map((_row, rowIndex) => {
							return (
								<tr key={rowIndex}>
									{new Array(blockSize[1]).fill(0).map((_col, colIndex) => {
										let blockNumber = rowIndex * 3 + colIndex;
										return (
											<td key={blockNumber}>
												<Block
													name={blockNumber}
													input={gameResult[blockNumber]}
													handler={updateTheGame}
												/>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<div>
					<button className="inline-block" onClick={updateTheGame}>
						<b>{"New Game"}</b>
					</button>
					<button
						className="inline-block"
						data-event="resetScores"
						onClick={updateTheGame}
					>
						<b>{"Reset the Scores"}</b>
					</button>
					<select
						data-event="setNumberOfPlayers"
						value={numberOfPlayers}
						className="inline-block"
						onChange={updateTheGame}
					>
						<option value="1">{"Single Player With Computer"}</option>
						<option value="2">{"Double Player"}</option>
					</select>
				</div>
				<Result
					className="centerText"
					playerWinningCount={playerWinningCount}
				/>
			</div>
		</div>
	);
}

export default TicTacToe;
