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
import StudentCxt from "../../helpers/StudentCommon";
import "../sign_up/SignUp.css";

const SignUp = ({ children }) => {
  let navigate = useNavigate();
  const { Universities, UniversityError, getUniversityById, University } =
    useContext(UniversitiesCxt);
  const { StudentBo, createStudent, StudentError } = useContext(StudentCxt);
  const { Colleges, CollegeError } = useContext(CollegesCxt);
  const [studentBo, setStudent] = useState(StudentBo);
  const [emailDomainName, setEmailDomainName] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [checkBox, setCheckBox] = useState(true);

  useEffect(() => {}, []);
  useMemo(() => setEmailDomainName(University.emailDomainName), [University]);

  const setFullName = (e) => {
    setStudent({
      ...studentBo,
      fullName: e.target.value,
    });
  };
  const setIdNumber = (e) => {
    setStudent({
      ...studentBo,
      idNumber: e.target.value,
    });
  };
  const setPhoneNumber = (e) => {
    setStudent({
      ...studentBo,
      phoneNumber: e.target.value,
    });
  };
  const setUserName = (e) => {
    var result = e.target.value.replace(/[^a-z.0-9]/gi, "");
    setStudent({
      ...studentBo,
      email: result,
    });
  };
  const setPassword = (e) => {
    setStudent({
      ...studentBo,
      password: e.target.value,
    });
  };
  const setGender = (e) => {
    setStudent({
      ...studentBo,
      gender: e.target.value,
    });
  };

  const setUniversity = (e) => {
    setStudent({
      ...studentBo,
      university: e.target.value,
    });
    getUniversityById(e.target.value);
  };

  const setCollege = (e) => {
    setStudent({
      ...studentBo,
      college: e.target.value,
    });
  };
  const createStudentt = () => {
    createStudent(studentBo);
    setStudent({
      ...studentBo,
      email: "",
    });
    navigate("/");
  };

  const test = () => {
    console.log(studentBo);
  };

  return (
    <>
      <Heading />
      <Container>
        <Button onClick={test}>test student obj </Button>
        <Form onSubmit={createStudentt}>
          <FormGroup>
            <Input
              name="Full Name"
              placeholder="Full Name"
              type="text"
              onChange={setFullName}
              maxLength={50}
              required
              valid={studentBo.fullName ? true : false}
              // invalid={!studentBo.fullName ? true : false}
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
              valid={studentBo.idNumber ? true : false}
              //invalid={!studentBo.idNumber ? true : false}
            />

            <Input
              name="Phone Number"
              placeholder="Phone Number"
              type="number"
              onChange={setPhoneNumber}
              maxLength={15}
              required
              valid={studentBo.phoneNumber ? true : false}
              //invalid={!studentBo.phoneNumber ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="user_name"
              name="User Name"
              placeholder="User Name"
              type="text"
              value={studentBo.email}
              onChange={setUserName}
              maxLength={30}
              valid={studentBo.email ? true : false}
              required
              //invalid={!studentBo.email ? true : false}
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
              valid={studentBo.password ? true : false}
              required
              //invalid={!studentBo.password ? true : false}
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
              valid={studentBo.gender ? true : false}
              //invalid={!studentBo.gender ? true : false}
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
              valid={studentBo.university ? true : false}
              //invalid={!studentBo.university ? true : false}
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
              valid={studentBo.college ? true : false}
              // invalid={!studentBo.college ? true : false}
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
            {StudentError && <h1> {StudentError} </h1>}
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
