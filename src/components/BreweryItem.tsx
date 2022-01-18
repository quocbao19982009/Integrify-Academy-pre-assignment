import React from "react";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import { breweryInterface } from "../interfaces/breweryInterface";
import { useNavigate, Link } from "react-router-dom";
import ButtonDetail from "./ButtonDetail";

interface BreweryItemProps {
  breweryInfo: breweryInterface;
}

const BreweryItem = ({ breweryInfo }: BreweryItemProps) => {
  return (
    <Card className="p-5 my-3 rounded">
      <Card.Body>
        <Card.Title>{breweryInfo.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Type: {breweryInfo.brewery_type}</ListGroup.Item>
          <ListGroup.Item>
            Coutry: {breweryInfo.country || breweryInfo.county_province}
          </ListGroup.Item>
          <ListGroup.Item>State: {breweryInfo.state}</ListGroup.Item>
        </ListGroup>
        <Link to={`/details/${breweryInfo.id}`}>
          <ButtonDetail />
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BreweryItem;
