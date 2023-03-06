import React, { useState, useEffect, useContext } from 'react'
import { FormGroup, Input, Label, Form, Container, Button, InputGroupText } from "reactstrap"
import Heading from '../../components/heading/Heading';
import { EyeFill } from 'react-bootstrap-icons';
import UniversityServices from "../../services/UniversityServices"
import CollegeServices from "../../services/CollegeServices"
import UniversitiesCxt from "../../helpers/UniversitiesCommon"
import CollegesCxt from "../../helpers/CollegesCommon"
import StudentCxt from '../../helpers/StudentsCommon';
import "../sign_up/SignUp.css"

const SignUp = ({ children }) => {

    const { Universities } = useContext(UniversitiesCxt)
    const { Colleges } = useContext(CollegesCxt)
    const { Student } = useContext(StudentCxt)
    const [studentBo, setStudent] = useState(Student)
    const [emailDomainName, setEmailDomainName] = useState()
    const [passwordType, setPasswordType] = useState()
    const [passwordToggle, setPasswordToggle] = useState(true)

    useEffect(() => {
        UniversityServices.getUniversityById(1).then((res) => {
            setEmailDomainName(res.data.emailDomainName)
            setStudent({
                ...studentBo,
                university: 1
            })
        });
        CollegeServices.getCollegeById(1).then((res) => {
            setStudent({
                ...studentBo,
                college: res.data.id
            })
        });
    },[]);

    const setUniversity = (e) => {
        setStudent({
            ...studentBo,
            university: e.target.value
        })
        UniversityServices.getUniversityById(e.target.value).then((res) => {
            setEmailDomainName(res.data.emailDomainName)
        });

    }

    const setCollege = (e) => {
        setStudent({
            ...studentBo,
            college: e.target.value
        })
    }

    // const createStudent = () => {

    // }
    const setFullName = (e) => {
        setStudent({
            ...studentBo,
            fullName: e.target.value
        })
    }

    const setIdNumber = (e) => {
        setStudent({
            ...studentBo,
            idNumber: e.target.value
        })
    }

    const setPhoneNumber = (e) => {
        setStudent({
            ...studentBo,
            phoneNumber: e.target.value
        })
    }

    const setPassword = (e) => {
        setStudent({
            ...studentBo,
            password: e.target.value
        })
    }

    const setGender = (e) => {
        setStudent({
            ...studentBo,
            gender: e.target.value
        })
    }


    const test = () => {
        console.log(studentBo)
    }

    const setEmail = (e) => {
        var result = e.target.value.replace(/[^a-z.0-9]/gi, '');
        setStudent({
            ...studentBo,
            email: result
        })
    }
    const togglePassword = () => {
        if (passwordToggle === true) {
            setPasswordType("password");
            setPasswordToggle(false);
            return
        }
        setPasswordType("text");
        setPasswordToggle(true);

    }


    return (
        <>
            <Heading />
            <Container  >

                <Button onClick={test}>test student obj </Button>
                <h1>

                </h1>
                <Form >
                    <FormGroup>
                        <Input
                            name="Full Name"
                            placeholder="Full Name"
                            type="text"
                            onChange={setFullName}
                            maxLength={50}
                        />
                    </FormGroup>
                    <FormGroup  >

                        <Input
                            name="Id Number"
                            placeholder="Id Number"
                            type="number"
                            onChange={setIdNumber}
                            maxLength={15}
                        />

                        <Input
                            name="Phone Number"
                            placeholder="Phone Number"
                            type="number"
                            onChange={setPhoneNumber}
                            maxLength={15}
                        />


                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="user_name"
                            name="User Name"
                            placeholder="User Name"
                            type="text"
                            value={studentBo.email}
                            onChange={setEmail}
                            maxLength={30}
                        />
                        <InputGroupText>
                            {emailDomainName}
                        </InputGroupText>
                    </FormGroup>
                    <FormGroup >
                        <Input
                            id="password"
                            name="password"
                            placeholder="Password "
                            type={passwordType}
                            onChange={setPassword}
                            maxLength={30}
                        >
                        </Input>
                        {< EyeFill onClick={togglePassword} />}


                    </FormGroup>
                    <FormGroup >
                        <Input
                            id="select_gender"
                            name="SelectGender"
                            type="select"
                            onChange={setGender}
                        >
                            {<option value="Male">Male</option>}
                            {<option value="Female" >Female</option>}
                        </Input>
                    </FormGroup>
                    <FormGroup>

                        <Input
                            id="select_university"
                            name="SelectUniversity"
                            type="select"
                            onChange={setUniversity}
                        >
                            {Universities.map((uni) =>
                                <option key={uni.id} value={uni.id}>{uni.name}</option>
                            )}


                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="select_college"
                            name="SelectCollege"
                            type="select"
                            onChange={setCollege}
                        >
                            {Colleges.map((college) => (
                                <option key={college.id} value={college.id}>{college.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" />
                        {' '}
                        <Label check>
                            Check me out
                        </Label>
                    </FormGroup>
                    <Button
                    // onClick={createStudent}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>

        </>

    )

}

export default SignUp

