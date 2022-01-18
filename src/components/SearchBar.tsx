import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="search"
        placeholder="Search By Name"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
