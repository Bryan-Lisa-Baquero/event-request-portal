import { Col, Container, Row } from "reactstrap";
import type { ButtonCardProps } from "./ButtonCard";
import ButtonCard from "./ButtonCard";

export interface ButtonCardListProps {
    buttonCards: ButtonCardProps[];
}

const ButtonCardList: React.FC<ButtonCardListProps> = ({ buttonCards }) => {
    return (
        <Container className="mt-3">
            <Row>
                {buttonCards.map((a, index) => (
                    <Col 
                        key={index} 
                        xs="12" 
                        sm="6"
                        className="mb-3"
                    >
                        <ButtonCard
                            description={a.description}
                            icon={a.icon}
                            routePath={a.routePath}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ButtonCardList;