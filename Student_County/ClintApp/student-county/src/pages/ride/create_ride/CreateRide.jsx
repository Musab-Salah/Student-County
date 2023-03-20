import React, { useContext, useState } from "react";
import Heading from "../../../components/heading/Heading";
import RidesCxt from "../../../helpers/RideCommon";
import DestinationsCxt from "../../../helpers/DestinationCommon";
import { useNavigate } from "react-router";
import { FormGroup, Input, Form, Container, Button } from "reactstrap";

const CreateRide = () => {
  let navigate = useNavigate();
  const { RideError, RideBo, createRide } = useContext(RidesCxt);
  const { DestinationError, Destinations } = useContext(DestinationsCxt);

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
        <Button onClick={() => navigate("/user_dashboard")}>go to dash</Button>
        {RideError && RideError}
      </Container>
    </>
  );
};

export default CreateRide;
