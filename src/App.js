import React from "react";
// import logo from './logo.svg';
import "./App.css";

function App() {
  const welcome = {
    greeting: "Hello",
    title: "Fan",
  };

  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") || "React"
  );

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLocaleLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <h1>
        {welcome.greeting}! {welcome.title}
      </h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

const List = (props) =>
  props.list.map(({objectID, ...item}) => <Item key={objectID} {...item} />);

const Item = ({title, url, author, num_comments, points}) => (
  <div>
    <span>
      <a href={url}>{title}</a>{" "}
    </span>
    <span>{author}</span> <span>{num_comments}</span> <span>{points}</span>
  </div>
);

const Search = ({search, onSearch}) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};

export default App;
