import React,{useEffect,setUser} from 'react'
import Heading from '../../components/heading/Heading';
import { FormGroup, Input, Label, Form, Container, Button } from "reactstrap"
import axios from "axios"

const SignUp = () => {
  
  async function fetchData() {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setUser(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    fetchData();
  },[])
  return (
    <>
      <Heading />
      <Container>
        <Form>
          <FormGroup>
            <Input
              id="full_name"
              name="Full Name"
              placeholder="Full Name"
              type="text"
            />
          </FormGroup>
          <FormGroup >

          <Input
              id="id_number"
              name="Id Number"
              placeholder="Id Number"
              type="number"
            />
            <Input
              id="phone_number"
              name="Phone Number"
              placeholder="Phone Number"
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="user_name"
              name="User Name"
              placeholder="User Name"
              type="text"
            />
          </FormGroup>
          <FormGroup >

            <Input
              id="password"
              name="password"
              placeholder="Password "
              type="password"
            />
            <Input
              id="confirm_password"
              name="Confirm Password"
              placeholder="Confirm Password"
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
            >
              <option>
                1
              </option>
              <option>
                2
              </option>
              <option>
                3
              </option>
              <option>
                4
              </option>
              <option>
                5
              </option>
            </Input>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" />
            {' '}
            <Label check>
              Check me out
            </Label>
          </FormGroup>
          <Button>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default SignUp
