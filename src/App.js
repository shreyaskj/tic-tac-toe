import React from 'react'
import './App.css';
import Block from './Block';
import Result from './Result';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: 1,
      isGameOver: false,
      firstPlayerCount: 0,
      secondPlayerCount: 0,
      result: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
    }
    this.updateTheGame = this.updateTheGame.bind(this)
  }

  componentDidUpdate() {
    let result = this.state.result;
    let playerWhoWon, wonPattern;
    let success = ['123', '456', '789', '147', '258', '369', '159', '357'];
    wonPattern = success.find((line) => {
      let digits = line.split('')
      let won = digits.every((digit) => {
        if(result[digit] === 1){
          return true
        }
        return false
      })
      if(won){
        playerWhoWon = 'firstPlayerCount'
      }
      return won
    })
    if(!wonPattern){
      wonPattern = success.find((line) => {
        let digits = line.split('')
        let won = digits.every((digit) => {
          if(result[digit] === 2){
            return true
          }
          return false
        })
        if(won){
          playerWhoWon = 'secondPlayerCount'
        }
        return won
      })
    }
    // console.log('wonIndex - ', wonPattern)
    if(!!playerWhoWon){
      wonPattern.split('').forEach((block) => {
        const element = document.querySelector(`[name="${parseInt(block)}"]`)
        element.style.borderColor = 'greenyellow';
        element.style.borderWidth = '6px'
      })
      setTimeout(() => {
        this.setState((state) => {
          return {
            [playerWhoWon]: state[playerWhoWon] + 1,
            result: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
          }
        })
        wonPattern.split('').forEach((block) => {
          const element = document.querySelector(`[name="${parseInt(block)}"]`)
          element.style.borderColor = 'black';
          element.style.borderWidth = '3px'
        })
      }, 3000)
    }
  }

  updateTheGame(event) {
    event.preventDefault()
    const eventType = event.currentTarget.getAttribute('data-event')
    if (eventType === 'play') {
      const name = event.currentTarget.name
      let number = parseInt(name)
      let player = this.state.player === 1 ? 2 : 1
      if(this.state.result[number] === 0){
        this.setState((state) => {
          let newResult = state.result;
          newResult[number] = state.player
          return {
            result: newResult,
            player,
          }
        })
      }
    } else if(eventType === 'resetScores'){
      this.setState({
        firstPlayerCount: 0,
        secondPlayerCount: 0
      })
    } else {
      this.setState({
        result: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
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
                <td>
                  <Block name="1" input={this.state.result["1"]} handler={this.updateTheGame} />
                  <Block name="2" input={this.state.result["2"]} handler={this.updateTheGame} />
                  <Block name="3" input={this.state.result["3"]} handler={this.updateTheGame} />
                </td>
              </tr>
              <tr>
                <td>
                  <Block name="4" input={this.state.result["4"]} handler={this.updateTheGame} />
                  <Block name="5" input={this.state.result["5"]} handler={this.updateTheGame} />
                  <Block name="6" input={this.state.result["6"]} handler={this.updateTheGame} />
                </td>
              </tr>
              <tr>
                <td>
                  <Block name="7" input={this.state.result["7"]} handler={this.updateTheGame} />
                  <Block name="8" input={this.state.result["8"]} handler={this.updateTheGame} />
                  <Block name="9" input={this.state.result["9"]} handler={this.updateTheGame} />
                </td>
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
