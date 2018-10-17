import React, { Component } from 'react'
import axios from 'axios'

const SearchResultDisplay = ({ list, filterString }) => {
  const resultData =
    !filterString ?
      list :
      list.filter(el => el.toLowerCase().includes(filterString.toLowerCase()))

  if (resultData.length > 10) {
    return <div>too many matches, specify another filter</div>
  }

  return (
    <div>
      {resultData.map(el => <div>{el}</div>)}
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
        this.setState({ countries: response.data.map(el => el.name)});
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
          onChange={this.handleInputChange}/>
        <SearchResultDisplay
          list={this.state.countries}
          filterString={this.state.searchTerm}/>
      </div>
    );
  }
}

export default App;
