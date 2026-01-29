import { Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

interface LinkLabel {
  label: string;
  to: string;
}

interface NotificationCardProps {
  headerOne: string;
  headerTwo?: string;
  body: string;
  linkLabels: LinkLabel[];
}

export default function NotificationCard({
  headerOne,
  headerTwo,
  body,
  linkLabels
}: NotificationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-5 text-center" style={{ maxWidth: 700 }}>
        <CardBody>
          <h4 className="mb-2 text-warning">{headerOne}</h4>
          {headerTwo && <h2 className="mb-4">{headerTwo}</h2>}

          <p className="mb-4">{body}</p>

          <div className="d-flex justify-content-center gap-3">
            {linkLabels.map(l => (
              <button
                key={l.to}
                className="btn btn-outline-primary"
                onClick={() => navigate(l.to)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
