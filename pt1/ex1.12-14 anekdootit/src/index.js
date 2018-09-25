import React from 'react'
import ReactDOM from 'react-dom'

const initArrayBasedOn = (baseArr) => Array.from(baseArr, el => 0)

const Anecdote = ({ text, score }) => {
    return (
        <div>
            {text}
            <br/>
            has {score ? score : 0} vote{score > 1 ? 's' : ''}
        </div>
    )
}

const BestAnecdote = ({ best, ...data }) => {
    if (best != null) {
        return (
            <Anecdote 
                text={data.text}
                score={data.score} />
        )
    }
    
    return <div>no votes given yet</div>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            points: initArrayBasedOn(props.anecdotes),
            best: null
        }
    }

    randomise = () => {
        const r = Math.floor(Math.random() * anecdotes.length)
        console.log(r)
        this.setState({ selected: r })
    }

    addVote = () => {
        const { selected, points, best } = this.state
        const pointsCopy = [...points]

        pointsCopy[selected] += 1
        const newBest = best == null || pointsCopy[selected] > pointsCopy[best] ? selected : best

        this.setState({ points: pointsCopy, best: newBest })
    }

    render() {
        console.log(this.state)
        const { selected, points, best } = this.state
        return (
            <div>
                <Anecdote 
                    text={this.props.anecdotes[selected]}
                    score={points[selected]} />
                <div>
                    <button onClick={this.addVote}>äänestä</button>
                    <button onClick={this.randomise}>seuraava</button>
                </div>
                <h2>suosituin anekdootti:</h2>
                <BestAnecdote 
                    best={best}
                    text={this.props.anecdotes[best]}
                    score={points[best]} />
            </div>
        )
    }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)