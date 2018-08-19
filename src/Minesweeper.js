import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/games/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: [],
                id: "",
                status: ""
            }
        }
    }

    componentDidMount() {
        // create the board
        // create board 
        fetch(BASE_URL , {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ difficulty: 0 })
        }).then(resp => resp.json())
            .then(newGame => {
                console.log("game", newGame);
                this.setState({
                    game: newGame,
                    id: newGame.id,
                    status: newGame.state
                })
            })
    }
    check = (row, column) => {    
    fetch(BASE_URL + this.state.game.id + "/check",{
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ 
            "row": row,
            "col": column 
        })
    }).then(resp => resp.json())
        .then(newGame => {
            if (newGame.state === "won") {
                console.log("Game Won")}
            else if (newGame.state === "lost") {
                console.log("Game Lost")}
            console.log("game", newGame);
            this.setState({
                game: newGame,
                status: newGame.state
            })
        })
}

flag = (row, column, event) => {  
    event.preventDefault()
    fetch(BASE_URL + this.state.game.id + "/flag",{
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "row": row,
            "col": column 
        })
    }).then(resp => resp.json())
        .then(newGame => {
            console.log("game", newGame);
            this.setState({
                game: newGame,
                status: newGame.state
            })
        })
}

    render() {
        return (
            <div className="board-background">
                Currently playing {this.state.game.id}
                <div>{this.state.game.state}</div>
                {this.state.game.board.map((row, i) => {
                    console.log("row", row, i)
                    return (
                        <div key={i} className="square-container">
                            {row.map((col, j) => {
                                return <span key={j} className="square" onClick= {() => this.check(i, j)} onContextMenu={(e) => this.flag(i, j, e)}>
                                    {this.state.game.board[i][j]}
                                    {/* is at */}
                                {/* {`${i}, ${j}`} */}
                                </span>
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Minesweeper;
