import { Link } from "react-router-dom";
import type LinkLabel from "../interfaces/LinkLabel";

interface SelectTileScreenProps {
    linkLabels: Array<LinkLabel>
}

export function SelectTileScreen({ linkLabels }: SelectTileScreenProps) {
  return (
    <div className="row mt-4">

      {linkLabels.map(({ link, label }) => (
        <div key={link} className="col-md-6 mb-3">
          <Link to={link} className="tile text-center">
            <div className="p-4 bg-primary text-white rounded shadow-sm">
              {label}
            </div>
          </Link>
        </div>
      ))}

    </div>
  );
}