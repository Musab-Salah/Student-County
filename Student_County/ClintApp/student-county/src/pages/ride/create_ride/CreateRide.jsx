import React, { useContext, useState } from "react";
import Heading from "../../../components/heading/Heading";
import { useNavigate } from "react-router";
import { FormGroup, Input, Form, Container, Button } from "reactstrap";
import useRides from "./../../../hooks/useRides";
import useDestinations from "./../../../hooks/useDestinations";

const CreateRide = () => {
  let navigate = useNavigate();
  const { RideError, RideBo, createRide } = useRides();
  const { DestinationError, Destinations } = useDestinations();

  const [rideBo, setRide] = useState(RideBo);

  const setEmptySeats = (e) => {
    setRide({
      ...rideBo,
      emptySeats: e.target.value,
    });
  };
  const setCarDescription = (e) => {
    setRide({
      ...rideBo,
      carDescription: e.target.value,
    });
  };
  const setDestination = (e) => {
    setRide({
      ...rideBo,
      destinationId: e.target.value,
    });
  };

  const AddRide = (e) => {
    e.preventDefault();
    createRide(rideBo);
  };

  const test = () => {
    console.log(rideBo);
  };
  return (
    <>
      <Heading />
      <Container>
        <Button onClick={test}>test book obj </Button>
        <Form onSubmit={AddRide}>
          <FormGroup>
            <Input
              name="Empty Seats"
              placeholder="Empty Seats"
              type="number"
              onChange={setEmptySeats}
              maxLength={10}
              required
              valid={rideBo.emptySeats ? true : false}
            />
          </FormGroup>

          <FormGroup>
            <Input
              name="Car Description"
              placeholder="Car Description"
              type="textarea"
              onChange={setCarDescription}
              maxLength={15}
              required
              valid={rideBo.carDescription ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="select_destination"
              name="SelectDestination"
              type="select"
              onChange={setDestination}
              defaultValue=""
              required
              valid={rideBo.destinationId ? true : false}
            >
              <option value="" disabled>
                Choose the Destination
              </option>
              {DestinationError && (
                <option disabled> {DestinationError} </option>
              )}
              {Destinations.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button>add</Button>
        </Form>
        <Button onClick={() => navigate("/dashboard")}>go to dash</Button>
        {RideError && RideError}
      </Container>
    </>
  );
};

export default CreateRide;