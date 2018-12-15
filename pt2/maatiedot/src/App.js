import React, { Component } from 'react'
import axios from 'axios'

class SearchEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpansion = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { name, capital, population, flag } = this.props.data
    const showWhenExpanded = { display: this.state.expanded ? '' : 'none'}
    return (
      <div onClick={this.toggleExpansion}>
        <h3>{name}</h3>
        <div style={showWhenExpanded}>
          <div>capital: {capital}</div>
          <div>population: {population}</div>
          <div><img src={flag} width='500'></img></div>
        </div>
      </div>
    )
  }
}

const SearchResultDisplay = ({ list, filterString }) => {
  const resultData =
    !filterString ?
      list :
      list.filter(el => el.name.toLowerCase().includes(filterString.toLowerCase()))

  if (resultData.length > 10) {
    return <div>too many matches, specify another filter</div>
  }

  if (resultData.length === 1) {
    const country = resultData[0]
    return (
      <SearchEntry data={country}/>
    )
  }

  return (
    <div>
      {resultData.map(el => <SearchEntry data={el}/>)}
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data.map(el => el) });
      })
  }

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div>
        find countries:
        <input
          value={this.state.searchTerm}
          onChange={this.handleInputChange} />
        <SearchResultDisplay
          list={this.state.countries}
          filterString={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
