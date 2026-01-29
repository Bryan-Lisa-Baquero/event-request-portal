import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

export interface InfoCardProps {
    header: string;
    description: string;
    icon: ReactElement;
    routePath: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ description, icon, routePath, header }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${routePath}`);
    };

    return (
        <Card onClick={handleClick} className="agentCard border-0">
            <CardHeader className="border-0" style={{background: 'none'}}>
                <Row>
                    <Col>
                        <h1>{icon}</h1>
                    </Col>       
                    <Col>
                        <h3>{header}</h3>                        
                    </Col>                                      
                </Row>                
            </CardHeader>
            <CardBody>
                {description}
            </CardBody>
        </Card>
    )
}

export default InfoCard;