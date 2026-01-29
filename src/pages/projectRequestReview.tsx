import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { ProjectRequestBase, ProjectRequestClient } from "../api/client";
import { useAuthFetch } from "../api/lookupClients";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function ProjectRequestReview() {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const [rowData, setRowData] = useState<ProjectRequestBase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const client = new ProjectRequestClient("", { fetch: authFetch });
        const res = await client.projectRequest_Get();
        console.log("RESPONSE: ");
        console.log(JSON.stringify(res));
        setRowData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  const columnDefs = useMemo<ColDef[]>(() => [
    { field: "requesterEmail", headerName: "Requester Email", flex: 1 },
    {
      field: "requestDate",
      headerName: "Request Date",
      valueFormatter: p =>
        p.value ? new Date(p.value).toLocaleDateString() : ""
    },
    { field: "projectName", headerName: "Project Name", flex: 1 },
    { field: "businessLine", headerName: "Business Line" },
    // { field: "stage", headerName: "Stage" }, // this should use a valueGetter from entry/labels
    { field: "projectRequestStage", headerName: "Status" },
    // {
    //   headerName: "Actions",
    //   valueGetter: () => "Review →"
    // }
  ], []);

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="mb-4">Project Request Review</h1>

      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "600px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="single"
          onRowClicked={e => {
            if (e.data) {
              navigate(`/management/project-request/${e.data.projectRequestId}`);
            }
          }}
          domLayout="autoHeight"
        />
      </div>
    </>
  );
}