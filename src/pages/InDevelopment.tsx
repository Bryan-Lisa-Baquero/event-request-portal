import type { JSX } from "react";
import { Col, Container, Row } from "reactstrap";
import { SlWrench, } from "react-icons/sl";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { PiScrewdriver } from "react-icons/pi";
/**
 * In Development Page Component.
 * Renders a placeholder indicating the page is under development.
 * @component          
 * @returns 
 * {JSX.Element} The rendered In Development page.     
 * @remarks 
 * This page serves as a placeholder for features or pages that are currently
 * under development. It displays relevant icons and a message to inform users.
 * @see PiScrewdriver
 * @see SlWrench
 * @see HiOutlineCog8Tooth       
 * @see Container
 * @see Row
 * @see Col    
 */
export default function InDevelopment(): JSX.Element { 

    return(
        <Container>
            <Row>
                <Col>
                    <h1><PiScrewdriver /> <SlWrench /> <HiOutlineCog8Tooth /></h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Page currently under development.</h1>
                </Col>
            </Row>
        </Container>
    )
}