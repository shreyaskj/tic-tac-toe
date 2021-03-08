import React from 'react'
import './App.css';
import Block from './Block';
import Result from './Result';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: 1,
      noOfPlayers: "2",
      isGameOver: false,
      firstPlayerCount: 0,
      secondPlayerCount: 0,
      result: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
      success: ['123', '456', '789', '147', '258', '369', '159', '357', '753', '951', '963', '852', '741', '987', '654', '321']
    }
    this.updateTheGame = this.updateTheGame.bind(this)
  }

  componentDidUpdate() {
    let curState = this.state;
    let success = ['123', '456', '789', '147', '258', '369', '159', '357']
    if (!curState.isGameOver && curState.noOfPlayers === '1' && curState.player === 2) {
      let player = this.state.player === 1 ? 2 : 1
      let random;
      let newResult = curState.result;
      let winningBlock, count = 0;
      let compPatternIndex = curState.success.findIndex((pattern) => {
        let isFound = false;
        count = 0;
        pattern.split('').forEach((block, index) => {
          if (count === 2 && curState.result[parseInt(block)] === 0) {
            winningBlock = parseInt(block)
            isFound = true;
          } else if (curState.result[parseInt(block)] === 1) {
            count++
          }
        })
        return isFound;
      })
      if (winningBlock) {
        let compSuccess = curState.success;
        compSuccess.splice(compPatternIndex, 1)
        newResult[winningBlock] = 2
        this.setState({
          result: newResult,
          player,
          success: compSuccess
        })
      } else {
        let calcA = Object.entries(curState.result).filter((entry) => {
          if (entry[1] === 0) {
            return true;
          }
          return false
        });
        if (calcA.length > 0) {
          random = Math.ceil(Math.random() * (calcA.length - 1)) || 0;
          random = calcA[random][0]
          newResult[random] = 2
          this.setState({
            result: newResult,
            player
          })
        }
      }
    }
    // --------------------------------------------
    let result = curState.result;
    let playerWhoWon, wonPattern;
    wonPattern = success.find((line) => {
      let digits = line.split('')
      let won = digits.every((digit) => {
        if (result[digit] === 1) {
          return true
        }
        return false
      })
      if (won) {
        playerWhoWon = 'firstPlayerCount'
      }
      return won
    })
    if (!wonPattern) {
      wonPattern = success.find((line) => {
        let digits = line.split('')
        let won = digits.every((digit) => {
          if (result[digit] === 2) {
            return true
          }
          return false
        })
        if (won) {
          playerWhoWon = 'secondPlayerCount'
        }
        return won
      })
    }
    if (!curState.isGameOver && !!playerWhoWon) {
      wonPattern.split('').forEach((block) => {
        const element = document.querySelector(`[name="${parseInt(block)}"]`)
        element.style.borderColor = 'greenyellow';
        element.style.borderWidth = '6px'
      })
      this.setState({
        isGameOver: true
      })
      setTimeout(() => {
        this.setState((state) => {
          return {
            [playerWhoWon]: state[playerWhoWon] + 1,
            result: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
            isGameOver: false,
            player: 1,
            success: ['123', '456', '789', '147', '258', '369', '159', '357', '753', '951', '963', '852', '741', '987', '654', '321']
          }
        })
        wonPattern.split('').forEach((block) => {
          const element = document.querySelector(`[name="${parseInt(block)}"]`)
          element.style.borderColor = 'black';
          element.style.borderWidth = '3px'
        })
      }, 2000)
    }
  }

  updateTheGame(event) {
    event.preventDefault()
    const eventType = event.currentTarget.getAttribute('data-event')
    if (eventType === 'play') {
      const name = event.currentTarget.name
      let number = parseInt(name)
      let player = this.state.player === 1 ? 2 : 1
      if (!this.state.isGameOver && this.state.result[number] === 0) {
        this.setState((state) => {
          let newResult = state.result;
          newResult[number] = state.player
          return {
            result: newResult,
            lastUpdatedBlock: number,
            player,
          }
        })
      }
    } else if (eventType === 'resetScores') {
      this.setState({
        firstPlayerCount: 0,
        secondPlayerCount: 0
      })
    } else if (eventType === 'noOfPlayers') {
      this.setState({
        noOfPlayers: event.target.value,
        firstPlayerCount: 0,
        secondPlayerCount: 0,
        result: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
        player: 1
      })
    } else {
      this.setState({
        result: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
        player: 1
      })
    }
  }

  render() {
    return (
      <div className="basic">
        <div className="gameContainer centerText">
          <h3>{"Tic Tac Toe"}</h3>
          <table>
            <tbody>
              <tr>
                <td><Block name="1" input={this.state.result["1"]} handler={this.updateTheGame} /></td>
                <td><Block name="2" input={this.state.result["2"]} handler={this.updateTheGame} /></td>
                <td><Block name="3" input={this.state.result["3"]} handler={this.updateTheGame} /></td>
              </tr>
              <tr>
                <td><Block name="4" input={this.state.result["4"]} handler={this.updateTheGame} /></td>
                <td><Block name="5" input={this.state.result["5"]} handler={this.updateTheGame} /></td>
                <td><Block name="6" input={this.state.result["6"]} handler={this.updateTheGame} /></td>
              </tr>
              <tr>
                <td><Block name="7" input={this.state.result["7"]} handler={this.updateTheGame} /></td>
                <td><Block name="8" input={this.state.result["8"]} handler={this.updateTheGame} /></td>
                <td><Block name="9" input={this.state.result["9"]} handler={this.updateTheGame} /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className="inline-block" onClick={this.updateTheGame}>
              <b>{"New Game"}</b>
            </button>
            <button className="inline-block" data-event="resetScores" onClick={this.updateTheGame}>
              <b>{"Reset the Scores"}</b>
            </button>
            <select data-event="noOfPlayers" value={this.state.noOfPlayers} className="inline-block" onChange={this.updateTheGame}>
              <option value="1">{"Single Player"}</option>
              <option value="2">{"Double Player"}</option>
            </select>
          </div>
          <Result
            className="centerText"
            firstPlayerCount={this.state.firstPlayerCount}
            secondPlayerCount={this.state.secondPlayerCount}
          />
        </div>
      </div>
    );
  }
}

export default App;
