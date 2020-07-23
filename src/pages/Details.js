import React, { useEffect, useState } from "react";
import "./Details.css";
import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
export default function Details(props) {
  const [book, setBook] = useState(null);
  console.log(props);
  // if (props.data == null) {
  //   return <div>no data...</div>;
  // }
  //
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(process.env.REACT_APP_SERVER + `/books/${id}`);
      const data = await res.json();
      console.log(data);
      setBook(data.data);
    }
    fetchBook();
  }, []);

  const editAudio = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.REACT_APP_SERVER + `/books/${id}`, {
      method: "PUT",
      headers: {
        "content-type": `application/json`,
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        audioUrl: e.target.audioURL.value,
      }),
    });
    if (res.status === 200) {
      const dt = await res.json();
      setBook(dt.data);
    } else {
      alert("cannot edit book");
    }
  };
  console.log(book);
  if (!book)
    return (
      <div>
        <h1>loading</h1>
        <Spinner animation="border" />
      </div>
    );
  return (
    <div class="detail-page">
      {/* <h3>Details about the book:</h3> */}
      <div class="container-fluid grey-background">
        <div class="container">
          <div class="detail-part row">
            <div class="col-md-3 col-xs-12">
              <img src={book.image} alt="no image" />
            </div>
            <div class="col-md-9 col-xs-12">
              <div class="detail-of-a-book">
                <h4>{book.title}</h4>

                {/* <div><ul>
                    {book.authors.map(item => {
                      return (<li>{item}</li>)
                    })}
                  </ul></div> */}
                <p>{book.authors}</p>

                <p className="detail-book">Page Count: {book.pageCount}</p>
                <p className="detail-book">Rating: {book.averageRating}</p>
                <p className="detail-book">
                  Published Date: {book.publishedDate}
                </p>
                {book.audioUrl ? (
                  <ReactAudioPlayer src={book.audioUrl} controls />
                ) : (
                  <div>no audio found</div>
                )}
                {props.user &&
                props.user.user &&
                props.user.user.role === "host" ? (
                  <form
                    onSubmit={(e) => editAudio(e)}
                    onChange={(e) =>
                      setBook({ ...book, audioUrl: e.target.value })
                    }
                  >
                    <p>Insert an MP3 file to edit/play the audio</p>
                    <input
                      type="text"
                      name="audioURL"
                      value={book.audioUrl}
                      className="audio-box"
                    ></input>
                  </form>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="book-description">
              <div>Description: {book.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
