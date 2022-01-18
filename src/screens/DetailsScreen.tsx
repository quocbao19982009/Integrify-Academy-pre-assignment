import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { useFetchDetails } from "../hooks/useFetch";
import { breweryInterface } from "../interfaces/breweryInterface";

const DetailsScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [breweryDetails, setBreweryDetails] = useState<breweryInterface | null>(
    null
  );
  const querySearch = `/${id}`;

  const { response, error, isLoading } = useFetchDetails(
    "https://api.openbrewerydb.org/breweries",
    querySearch
  );

  console.log(breweryDetails);
  useEffect(() => {
    if (response) {
      setBreweryDetails(response);
    }
  }, [querySearch, response]);

  return (
    <>
      {!isLoading && error && <h2>Something went wrong!</h2>}
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && !error && (
        <Card>
          <Card.Header>ID: {breweryDetails?.id}</Card.Header>
          <Card.Body>
            <Card.Title>{breweryDetails?.name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Brewery Type: {breweryDetails?.brewery_type}
              </ListGroup.Item>
              <ListGroup.Item>
                Address:{" "}
                {`${breweryDetails?.street}, ${breweryDetails?.city}, ${
                  breweryDetails?.state || breweryDetails?.county_province
                }, ${breweryDetails?.country}.`}
              </ListGroup.Item>
              <ListGroup.Item>
                Postal Code: {breweryDetails?.postal_code}
              </ListGroup.Item>
              {breweryDetails?.website_url && (
                <ListGroup.Item>
                  Website: {breweryDetails?.website_url}
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                Phone Number: {breweryDetails?.phone}
              </ListGroup.Item>
              {breweryDetails?.longitude && breweryDetails?.latitude && (
                <ListGroup.Item>
                  Longtitude: {breweryDetails?.longitude}
                  <br></br>
                  Latitude: {breweryDetails?.latitude}
                </ListGroup.Item>
              )}
            </ListGroup>
            <Button onClick={() => navigate(-1)} variant="primary">
              Go Back
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default DetailsScreen;
