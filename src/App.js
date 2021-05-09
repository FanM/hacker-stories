import React from "react";
// import logo from './logo.svg';
import './App.css';

function App() {
  const welcome = {
    greeting: "Hello",
    title: "Fan"
  };

  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ];

  const handleSearch = e => console.log(e.target.value);

  return (
    <div className="App">
      <h1>
        {welcome.greeting}! {welcome.title}
      </h1>
      <Search onSearch={handleSearch} />
      <hr />
      <List list={stories} />
    </div>
  );
};

const List = props =>
  props.list.map(item => (
    <div key={item.objectID}>
      {" "}
      <span>
        <a href={item.url}>{item.title}</a>{" "}
      </span>
      <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
      <span>{item.points}</span>
    </div>
  ));

const Search = props => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = e => {
    setSearchTerm(e.target.value);
    props.onSearch(e);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}

export default App;
