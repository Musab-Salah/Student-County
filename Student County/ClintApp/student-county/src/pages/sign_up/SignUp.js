import React, { Component } from 'react'
import EmployeeService from '../../services/UniversityServices'
import { FormGroup, Input, Label, Form, Container, Button } from "reactstrap"
import Heading from '../../components/heading/Heading';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
            console.log(this.state.employees)
  
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    render() {
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
                               {this.state.employees.map((item) => (
                        <option key={item.id}>{item.name}{item.emailDomainName}</option>
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
                        <Button>
                            Submit
                        </Button>
                    </Form>
                </Container>

            </>
        )
    }
}

export default ListEmployeeComponent

