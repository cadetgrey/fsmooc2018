import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ nimike, lukema }) => (
    <tr>
        <td>{nimike}</td>
        <td>{lukema}</td>
    </tr>
)

const Statistics = ({ tila }) => {
    const { yht, ...arviot } = tila

    const eiArvioita = yht == 0
    if (eiArvioita) {
        return <p>ei yhtään palautetta annettu</p>
    }

    // luo komponentti Table, joka rakentaa taulukon Statistic-kokoelman perusteella,
    // ja hoitaa avaimet oikein

    const tilasto = Object.keys(arviot).map((laatu, i) => <Statistic key={i} nimike={laatu} lukema={arviot[laatu]} />)
    const keskiarvo = (arviot.hyvä + -Math.abs(arviot.huono)) / yht
    const positiivisia = arviot.hyvä / yht * 100

    return (
        <table>
            <tbody>
                {tilasto}
                <Statistic nimike={'keskiarvo'} lukema={keskiarvo.toFixed(1)} />
                <Statistic nimike={'positiivisia'} lukema={positiivisia.toFixed(1) + ' %'} />
            </tbody>
        </table>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0,
            yht: 0
        }
    }

    lisaaArvio = (nimike) => () => {
        this.setState({ [nimike]: this.state[nimike] + 1, yht: this.state.yht + 1})
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.lisaaArvio('hyvä')} text='hyvä' />
                <Button handleClick={this.lisaaArvio('neutraali')} text='neutraali' />
                <Button handleClick={this.lisaaArvio('huono')} text='huono' />
                <h1>statistiikka</h1>
                <Statistics tila={this.state} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));