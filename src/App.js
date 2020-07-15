import React, { Component } from 'react';
import { connect } from 'react-redux';

import OverlayScreen from './components/OverlayScreen';
import Scores from './components/Scores';
import Snake from './components/Snake';
import Food from './components/Food';
import ArrowButtons from './components/ArrowButtons';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max-min+1)+min)/5)*5;
  let y = Math.floor((Math.random() * (max-min+1)+min)/5)*5;
  return [x, y]
}

const initialState = {
  welcome: false,
  snakeDots: [
    [0, 0],
    [5, 0],
    [10, 0]
  ],
  food: getRandomCoordinates(),
  direction: 'RIGHT',
  speed: 180,
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
    // this.go();
    this.setState({ welcome: true })
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  startNewGame() {
    // e.preventDefault();
    this.setState(initialState, this.go);
  }

  go() {
    this.intervalID = setInterval(this.moveSnake, this.state.speed);
  }

  onkeydown = (e) => {
    e = e || window.event;
    this.setDirection(e.keyCode);
  }

  setDirection(keyCode) {
    switch(keyCode) {
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
        if(this.state.pause) {
          this.go();
          this.setState({ pause: false });
        }
        else {
          this.pause();
          this.setState({ pause: true });
        }
        break;
      default:
        // do nothing
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
        break;
      default:
        // do nothing
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
    this.setState({ gameOver : true })
    this.pause();
  }

  pause() {
    clearInterval(this.intervalID);
  }

  render() {
    // if (this.props.auth) {
    //   console.log(this.props.auth);
    // }
    return (
      <div>
        { this.state.welcome || this.state.gameOver ? 
          <OverlayScreen 
            startNewGame={() => this.startNewGame()}
            welcome={this.state.welcome}
            firstName={ this.props.currentUser ? this.props.currentUser.firstName : false }
            gameOver={this.state.gameOver}
            loggedIn={this.props.loggedIn}
            problem={this.state.problem}
            length={this.state.snakeDots.length - 3}
          /> 
          : null
        }
        <Scores currentUser={this.props.currentUser} length={this.state.snakeDots.length - 3} loggedIn={this.props.loggedIn} />
        <div className="game-container">
          <div className="game-area">
            <Snake snakeDots = {this.state.snakeDots}/>
            <Food dot={this.state.food} />
          </div>
        </div>
        <ArrowButtons setDirection={(keycode) => this.setDirection(keycode)} pause={this.state.pause} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  auth: state.auth,
  currentUser: state.auth.currentUser ? state.auth.currentUser : false
});

export default connect(mapStateToProps)(App);
