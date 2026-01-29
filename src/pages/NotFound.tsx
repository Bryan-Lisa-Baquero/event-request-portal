import type { JSX } from "react";
import { Col, Container, Row } from "reactstrap";
import { TbFaceIdError } from "react-icons/tb";
/**
 * Not Found Page Component.
 * Renders a 404 error message for non-existent pages.
 * @component
 * @returns {JSX.Element} The rendered Not Found page.
 *  @remarks
 * This page is displayed when a user navigates to a route that does not exist within the application.
 * It provides a clear indication that the requested page could not be found.
 * @see TbFaceIdError
 * @see Container
 * @see Row
 * @see Col
 */
export default function NotFound(): JSX.Element { 

    return(
        <Container>
            <Row>
                <Col>
                    <h1><TbFaceIdError /></h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>404: Page Not Found.</h1>
                </Col>
            </Row>
        </Container>
    )
}