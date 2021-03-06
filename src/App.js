import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

function isSearched(searchTerm) {
return function(item) {
return !searchTerm || 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
     result: null,
     searchTerm: DEFAULT_QUERY,
    }
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);

   
  }

 setSearchTopStories(result) {
      this.setState({ result });
    }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
}

componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
}

  render() {
    const {searchTerm,result} = this.state;
    return (
      <div className="Page">
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChanged}>
          Search
        </Search>
        </div>
        {result &&
           <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}/>
        }
      </div>
    );
  }
  onDismiss(itemId) {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== itemId);
    this.setState({
      result: {...this.state.result,hits: updatedHits}}
    );

  }

  onSearchChanged(event) {
    this.setState({searchTerm: event.target.value});

  }

}

const Search = 
  ({value, onChange,children}) => 
     <form>
      {children} <input type="text"
      onChange={onChange}
      value={value}
        />
    </form>
  


const Table = ({list,pattern,onDismiss}) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map( 
        item => 
          <div className="table-row" key={item.objectID}> 
          <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
                  Dismiss
                  </Button>
            </span>
          </div>
        )}
   </div>

 const Button = ({onClick, className='', children}) =>
    <button
      onClick={onClick}
      className={className}
      type="button"
      >
      {children}
      </button>

export default App;
