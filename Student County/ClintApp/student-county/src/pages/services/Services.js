import React from 'react'
import Heading from '../../components/heading/Heading';
import { BiHome } from "react-icons/bi";
import {Container} from "reactstrap"
import {Link} from "react-router-dom"



const Services = () => {


 
    return (
        <>
            <Heading />
            <Container >

            <div className="card btn" style={{ width: 180 }}>
                <Link  to="/">

                <BiHome  size={60}/>

                <div className="card-body">
                    <p className="card-text">Book Store</p>
                </div>
                </Link>
            </div>
            </Container>


        </>
    )
}

export default Services
