import React, { useState, useEffect, useContext, useMemo } from "react";
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
import Heading from "../../components/heading/Heading";
import { EyeFill } from "react-bootstrap-icons";
import UniversitiesCxt from "../../helpers/UniversityCommon";
import CollegesCxt from "../../helpers/CollegeCommon";
import UsersCxt from "../../helpers/UsersCommon";
import "../sign_up/SignUp.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = ({ children }) => {
  let navigate = useNavigate();
  const { Universities, UniversityError, getUniversityById, University } =
    useContext(UniversitiesCxt);
  const { UserBo, createUser, UserError } = useContext(UsersCxt);
  const { Colleges, CollegeError } = useContext(CollegesCxt);
  const [userBo, setUser] = useState(UserBo);
  const [emailDomainName, setEmailDomainName] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [checkBox, setCheckBox] = useState(true);

  useEffect(() => {}, []);
  useMemo(() => setEmailDomainName(University.emailDomainName), [University]);

  const setFirstName = (e) => {
    setUser({
      ...userBo,
      firstName: e.target.value,
    });
  };
  const setLastName = (e) => {
    setUser({
      ...userBo,
      lastName: e.target.value,
    });
  };
  const setIdNumber = (e) => {
    setUser({
      ...userBo,
      idNumber: e.target.value,
    });
  };
  const setPhoneNumber = (e) => {
    setUser({
      ...userBo,
      phoneNumber: e.target.value,
    });
  };

  const setUserName = (e) => {
    var result = e.target.value.replace(/[^a-z.0-9]/gi, "");
    setUser({
      ...userBo,
      email: result,
      userName: result,
    });
  };
  const setPassword = (e) => {
    setUser({
      ...userBo,
      password: e.target.value,
    });
  };
  const setGender = (e) => {
    setUser({
      ...userBo,
      gender: e.target.value,
    });
  };

  const setUniversity = (e) => {
    setUser({
      ...userBo,
      universityId: e.target.value,
    });
    getUniversityById(e.target.value);
  };

  const setCollege = (e) => {
    setUser({
      ...userBo,
      collegeId: e.target.value,
    });
  };
  const createUsert = () => {
    createUser(userBo);
    setUser({
      ...userBo,
      email: "",
    });
    navigate("/");
  };

  const test = () => {
    console.log(userBo);
  };

  return (
    <>
      <Heading />
      <Container>
        <Button onClick={test}>test user obj </Button>
        <Form onSubmit={createUsert}>
          <FormGroup>
            <Input
              name="First Name"
              placeholder="First Name"
              type="text"
              onChange={setFirstName}
              maxLength={50}
              required
              valid={userBo.FirstName ? true : false}

              // invalid={!userBo.fullName ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="Last Name"
              placeholder="Last Name"
              type="text"
              onChange={setLastName}
              maxLength={50}
              required
              valid={userBo.LastName ? true : false}
              // invalid={!userBo.fullName ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="Id Number"
              placeholder="Id Number"
              type="number"
              onChange={setIdNumber}
              maxLength={15}
              required
              valid={userBo.idNumber ? true : false}
              //invalid={!userBo.idNumber ? true : false}
            />

            <Input
              name="Phone Number"
              placeholder="Phone Number"
              type="number"
              onChange={setPhoneNumber}
              maxLength={15}
              required
              valid={userBo.phoneNumber ? true : false}
              //invalid={!userBo.phoneNumber ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="user_name"
              name="User Name"
              placeholder="User Name"
              type="text"
              value={userBo.email}
              onChange={setUserName}
              maxLength={30}
              valid={userBo.email ? true : false}
              required
              //invalid={!userBo.email ? true : false}
            />
            <InputGroupText>
              {!emailDomainName ? "@" : emailDomainName}
              {!emailDomainName && UniversityError && UniversityError}
            </InputGroupText>
          </FormGroup>
          <FormGroup>
            <Input
              id="password"
              name="password"
              placeholder="Password "
              type={passwordType}
              onChange={setPassword}
              maxLength={30}
              valid={userBo.password ? true : false}
              required
              //invalid={!userBo.password ? true : false}
            ></Input>
            {
              <EyeFill
                onClick={() =>
                  passwordType === "text"
                    ? setPasswordType("password")
                    : setPasswordType("text")
                }
              />
            }
          </FormGroup>

          <FormGroup>
            <Input
              id="select_gender"
              name="SelectGender"
              type="select"
              onChange={setGender}
              required
              defaultValue=""
              valid={userBo.gender ? true : false}
              //invalid={!userBo.gender ? true : false}
            >
              {
                <option value="" disabled>
                  Choose the Gender
                </option>
              }

              {<option value="Male">Male</option>}
              {<option value="Female">Female</option>}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              id="select_university"
              name="SelectUniversity"
              type="select"
              onChange={setUniversity}
              defaultValue=""
              required
              valid={userBo.university ? true : false}
              //invalid={!userBo.university ? true : false}
            >
              <option value="" disabled>
                Choose the University
              </option>
              {UniversityError && <option disabled> {UniversityError} </option>}
              {Universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              id="select_college"
              name="SelectCollege"
              type="select"
              onChange={setCollege}
              defaultValue=""
              required
              valid={userBo.college ? true : false}
              // invalid={!userBo.college ? true : false}
            >
              <option value="" disabled>
                Choose the College
              </option>
              {CollegeError && <option disabled> {CollegeError} </option>}
              {Colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup check>
            <Input
              required
              onClick={(e) =>
                e.target.checked ? setCheckBox(false) : setCheckBox(true)
              }
              type="checkbox"
            />{" "}
            <Label check>Check me out</Label>
          </FormGroup>
          <FormGroup>
            <Button disabled={checkBox}>Submit</Button>
            {UserError && <h1> {UserError} </h1>}
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
