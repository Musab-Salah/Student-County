import React, { useContext, useState } from "react";
import Heading from "../../../components/heading/Heading";
import HousingsCxt from "../../../context/HousingCommon";
import { useNavigate } from "react-router";
import {
  FormGroup,
  Input,
  Label,
  Form,
  Container,
  Button,
  InputGroupText,
} from "reactstrap";

const CreateHousing = () => {
  let navigate = useNavigate();
  const { HousingError, HousingBo, createHousing } = useContext(HousingsCxt);

  const [housingBo, setHousing] = useState(HousingBo);

  const setHousingName = (e) => {
    setHousing({
      ...housingBo,
      name: e.target.value,
    });
  };
  const setLocation = (e) => {
    setHousing({
      ...housingBo,
      location: e.target.value,
    });
  };

  const AddHousing = (e) => {
    e.preventDefault();
    createHousing(housingBo);
  };

  const test = () => {
    console.log(housingBo);
  };
  return (
    <>
      <Heading />
      <Container>
        <Button onClick={test}>test book obj </Button>
        <Form onSubmit={AddHousing}>
          <FormGroup>
            <Input
              name="Housing Name"
              placeholder="Housing Name"
              type="text"
              onChange={setHousingName}
              maxLength={50}
              required
              valid={housingBo.name ? true : false}
            />
          </FormGroup>

          <FormGroup>
            <Input
              name="Location"
              placeholder="Location"
              type="text"
              onChange={setLocation}
              maxLength={50}
              required
              valid={housingBo.location ? true : false}
            />
          </FormGroup>

          <Button>add</Button>
        </Form>
        <Button onClick={() => navigate("/dashboard")}>go to dash</Button>
        {HousingError && HousingError}
      </Container>
    </>
  );
};

export default CreateHousing;
