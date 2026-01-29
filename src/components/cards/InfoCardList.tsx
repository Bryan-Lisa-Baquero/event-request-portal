import { Col, Container, Row } from "reactstrap";
import type { InfoCardProps } from "./InfoCard";
import InfoCard from "./InfoCard";

export interface InfoCardListProps {
    title?: string | undefined;
    infoCards: InfoCardProps[];
}

const InfoCardList: React.FC<InfoCardListProps> = ({ title, infoCards }) => {
    return (
        <Container className="mt-3">
            {title && (
                <Row>
                    <Col>
                        <h3>{title}</h3>
                    </Col>
                </Row>
            )}
            <Row>
                {infoCards.map((ic, index) => (
                    <Col 
                        key={index} 
                        xs="12" 
                        sm="6"
                        className="mb-3"
                    >
                        <InfoCard
                            header={ic.header}
                            description={ic.description}
                            icon={ic.icon}
                            routePath={ic.routePath}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default InfoCardList;