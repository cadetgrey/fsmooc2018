import React from 'react'

export const Otsikko = ({ teksti }) => {
    return (
        <h1>{teksti}</h1>
    )
}

const Osa = ({ nimi, tehtavia }) => {
    return (
        <p>{nimi} {tehtavia}</p>
    )
}

const Sisalto = ({ osat }) => {
    const sisalto = osat.map((osa) => 
        <Osa key={osa.id}
             nimi={osa.nimi}
             tehtavia={osa.tehtavia} />
    );

    return (
        <div>
            {sisalto}
        </div>
    )
}

const Yhteensa = ({ osat }) => {
    const summa = osat.reduce((acc, curr) => {
        return acc + curr.tehtavia
    }, 0)

    return (
        <p>yhteensä {summa} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko teksti={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi