import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.tiedot.nimi} {props.tiedot.tehtavia}</p>
    )
}

const Sisalto = (props) => {
    const osat = props.osat.map((osa) => 
        <Osa tiedot={osa} />
    );

    return (
        <div>
            {osat}
        </div>
    )
}

const Yhteensa = (props) => {
    let summa = props.osat.reduce((acc, curr) => {
        return acc + curr.tehtavia
    }, 0)
    return (
        <p>yhteensä {summa} tehtävää</p>
    )
}


const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div >
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)