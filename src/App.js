import React, { Component } from 'react';
import './App.css';

 const list = [
  {
    title: 'React',
    url: 'http://www.mattboyle.com',
    author: 'Matt Boyle',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
   {
    title: 'Redux',
    url: 'http://www.crowdcube.com',
    author: 'Mattey',
    num_comments: 3,
    points: 4,
    objectID: 1
  },
];

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
      list,
      searchTerm:'',
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
  }
  render() {
    const {searchTerm,list} = this.state;
    return (
      <div className="Page">
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChanged}>
          Search
        </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}/>
      </div>
    );
  }
  onDismiss(itemId) {
    const updatedList = this.state.list.filter(item => item.objectID !== itemId);
    this.setState({
      list: updatedList
    })

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
      className="button-inline"
      >
      {children}
      </button>

export default App;
