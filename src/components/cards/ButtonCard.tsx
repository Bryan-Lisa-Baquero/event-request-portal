import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Row } from "reactstrap";

export interface ButtonCardProps {
    description: string;
    icon: ReactElement;
    routePath: string;
    requiredRole?: string;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ description, icon, routePath }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!routePath) return;

        const isExternal = /^https?:\/\//.test(routePath);

        if (isExternal) {
            window.open(routePath, "_blank");
            return;
        }

        navigate(routePath);
    };

    return (
        <Card onClick={handleClick} className="agentCard border-0">
            <CardHeader className="border-0" style={{background: 'none'}}>
                <Row>
                    <Col>
                        <h1>{icon}</h1>
                    </Col>       
                    <Col>
                        <h3>{description}</h3>                        
                    </Col>                                      
                </Row>                
            </CardHeader>
        </Card>
    )
}
export default ButtonCard;