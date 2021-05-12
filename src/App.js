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

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

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
      <InputWithLabel
        id="search"
        type="text"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <String>Search:</String>
      </InputWithLabel>
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

const InputWithLabel = ({
  id,
  type,
  value,
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const String = ({children}) => <strong>{children}</strong>;

export default App;
