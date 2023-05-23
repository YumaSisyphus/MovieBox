import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function AddEdit() {
  const [state, setState] = useState(initialState);

  const { name, email, password } = state;

  const history = useNavigate();

  const { id } = useParams();

  // useEffect(() => {
  //     axios.get(`http://localhost:5000/api/get/${id}`)
  //         .then((response) => setState({ ...response.data[0] }))
  // }, [id])

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => {
          const { name, email, password } = resp.data[0];
          setState({ name, email, password });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Provide");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            email,
            password,
          })
          .then(() => {
            setState({ name: "", email: "", password: "" });
          })
          .catch((err) => alert(err.response.data));
        // setTimeout(() => history.push("/"), 500)
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            email,
            password,
          })
          .then(() => {
            setState({ name: "", email: "", password: "" });
          })
          .catch((err) => alert(err.response.data));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      {/* <Header /> */}
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Username.."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Your Password.."
          value={password || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email.."
          value={email || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/Dashboard">
          <input type="button" value="Go Back" />
        </Link>
      </form>
      <Footer />
    </div>
  );
}
