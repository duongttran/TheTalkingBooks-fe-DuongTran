import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./AddBook.css";
import { BACKEND_URL } from "../app.constants";

export default function AddBook(props) {
  // console.log("xxxxxxx", props);
  const [books, setBooks] = useState([]);
  const [admin, setAdmin] = useState([]);

  const checkAdmin = async () => {
    const data = await fetch(process.env.REACT_APP_SERVER + "/users");
    const result = await data.json();

    console.log("checkAdmin is called", result);
    // console.log("result.data.role", result1);
  };

  async function searchBook(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=${process.env.REACT_APP_googleKey}`;
    const res = await fetch(url);
    const data = await res.json();
    setBooks(data.items.map((e) => e.volumeInfo));
  }
  console.log(books);

  async function addToDatabase({
    categories: genres,
    title,
    authors,
    publishedDate,
    description,
    pageCount,
    industryIdentifiers,
    imageLinks,
    averageRating,
  }) {
    let body = {
      genres,
      title,
      authors,
      publishedDate,
      description,
      pageCount,
      isbn13: industryIdentifiers
        ? industryIdentifiers[0].identifier || ""
        : "ISBN Unknown",
      image: (imageLinks && imageLinks.thumbnail) || "",
      averageRating: averageRating,
      token: localStorage.getItem("token"),
    };
    await postBook(body);
    alert("Book has been added to the collection");
  }

  async function postBook(body) {
    const res = await fetch(process.env.REACT_APP_SERVER + "/books", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const item = await res.json();
    console.log(item);
  }

  function renderBooks(arr) {
    return arr.map((book) => {
      return (
        <div class="book-search-result">
          <h5>{book.title}</h5>
          {book.authors && <p>{book.authors.join(", ")}</p>}
          {book.imageLinks && book.imageLinks.thumbnail && (
            <img src={book.imageLinks.thumbnail} alt={book.title} />
          )}

          <Button className="add-to-db" onClick={() => addToDatabase(book)}>
            Add book to database
          </Button>
        </div>
      );
    });
  }

  return (
    <div>
      {admin ? (
        <div className="addbook-page">
          <form onSubmit={searchBook} class="search-book">
            <label>Title:</label>

            <input
              type="text"
              name="title"
              placeholder="Enter book title to search"
              className="search-box"
            />
          </form>

          {/* <button onClick={() => checkAdmin()}>Check admin</button> */}
          <div></div>
          {renderBooks(books)}
        </div>
      ) : (
        <div>You're not and admin</div>
      )}
    </div>
  );
}
