import React, {Component} from 'react';
import Snake from './Snake';
import Food from './Food';
import GameOver from './GameOver';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max-min+1)+min)/5)*5;
  let y = Math.floor((Math.random() * (max-min+1)+min)/5)*5;
  return [x, y]
}

const initialState = {
  snakeDots: [
    [0, 0],
    [5, 0],
    [10, 0]
  ],
  food: getRandomCoordinates(),
  direction: 'RIGHT',
  speed: 150,
  pause: false,
  gameOver: false,
  problem: ''
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.intervalID = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onkeydown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        if(this.state.direction !== 'DOWN' && !this.state.pause) {
          this.setState({direction: 'UP'});
        }
        break;
      case 40:
        if(this.state.direction !== 'UP' && !this.state.pause) {
          this.setState({direction: 'DOWN'});
        }
        break;
      case 37:
        if(this.state.direction !== 'RIGHT' && !this.state.pause) {
          this.setState({direction: 'LEFT'});
        }
        break;
      case 39:
        if(this.state.direction !== 'LEFT' && !this.state.pause) {
          this.setState({direction: 'RIGHT'});
        }
        break;
      case 32:
        console.log(this.state.pause);
        if(this.state.pause) {
          this.intervalID = setInterval(this.moveSnake, this.state.speed);
          this.setState({ pause: false });
        }
        else {
          this.pause();
          this.setState({ pause: true });
        }
        break;
    }
  }

  moveSnake = () => {
    if(!this.state.gameOver) {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];

    switch(this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 5, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 5, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 5];
        break;
      case 'UP':
        head = [head[0], head[1] - 5];
    }
    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots })
    }
  }

  checkIfOutOfBorders() {
    if(!this.state.gameOver) {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.setState({ problem: 'crashed' })
        this.gameOver();
      }
    }
  }

  checkIfCollapsed() {
    if(!this.state.gameOver) {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      snake.pop();
      snake.forEach(dot => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
          this.setState({ problem: 'collapsed' })
          this.gameOver();
        }
      })
    }
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed -10
      })
    }
  }

  gameOver() {
    // alert(`Game over. Snake length is ${this.state.snakeDots.length}`);
    // this.setState(initialState);
    this.setState({ gameOver : true })
    this.pause();
  }

  pause() {
    clearInterval(this.intervalID);
  }

  startNewGame(e) {
    e.preventDefault();
    this.setState(initialState);
    this.intervalID = setInterval(this.moveSnake, this.state.speed);
  }

  render() {
    if (this.state.gameOver) {
      console.log('GAME OVER')
    }
    return (
      <div className="game-container">
        { this.state.gameOver ? <GameOver startNewGame={(e) => this.startNewGame(e)} problem={this.state.problem} length={this.state.snakeDots.length} /> : null }
      <div className="game-area">
        <Snake snakeDots = {this.state.snakeDots}/>
        <Food dot={this.state.food} />
      </div>
      </div>
    );
  }
}

export default App;
