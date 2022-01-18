import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import BreweryItem from "../components/BreweryItem";
import { breweryInterface } from "../interfaces/breweryInterface";
import { useFetch } from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
const MainScreen = () => {
  const params = useParams();
  const keywords = params.keyword?.replaceAll(" ", "%20");
  const navigate = useNavigate();
  const querySearch = keywords ? `?by_name=${keywords}` : "";
  const [breweriesData, setbreweriesData] = useState<breweryInterface[]>([]);

  const { response, error, isLoading } = useFetch(
    "https://api.openbrewerydb.org/breweries",
    querySearch
  );

  useEffect(() => {
    if (response) {
      setbreweriesData(response);
    }
  }, [response]);

  return (
    <div>
      <SearchBar />
      <h1 className="m-3">Brewing Collection</h1>
      {keywords && (
        <div className="text-start my-3">
          <Button onClick={() => navigate("/")}>Back to All</Button>
        </div>
      )}

      {!isLoading && error && <h2>Something went wrong</h2>}
      {isLoading && !error && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && !error && (
        <Row>
          {breweriesData.map((item) => (
            <Col sm={12} md={6} lg={4} xl={3} key={item.id}>
              {" "}
              <BreweryItem breweryInfo={item} />{" "}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MainScreen;
