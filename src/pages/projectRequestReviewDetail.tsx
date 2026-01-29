// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button, Spinner, Badge } from "reactstrap";
// import { ClientClient, ClientDto, EmployeeClient, EmployeeDto, Organization, OrganizationClient, ProjectRequest, ProjectRequestClient, type ProjectRequestStage } from "../api/client";
// import { useAuthFetch } from "../api/lookupClients";
// import { Row, Col } from "reactstrap";
// import { camelToUserFriendly } from "../Helpers";



// export default function ProjectRequestReviewDetail() {
//   const { id } = useParams();
//   const authFetch = useAuthFetch();
//   const [data, setData] = useState<ProjectRequest | null>(null);
//   const [stage, setStage] = useState<ProjectRequestStage>("Pending");
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [employeesById, setEmployeesById] =
//     useState<Record<string, EmployeeDto>>({});
//   const [clientsById, setClientsById] =
//     useState<Record<string, ClientDto>>({});
//   const [organizationsById, setOrganizationsById] =
//     useState<Record<string, Organization>>({});
//   const isApproved = stage === "Approved";
//   const [fieldLookups, setFieldLookups] = useState<Record<string, Record<string, string>>>({
//     projectRequestStage: {
//       Pending: "Pending",
//       Approved: "Approved",
//       "Changes Requested": "Changes Requested"
//     }

//   });

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const client = new ProjectRequestClient("", { fetch: authFetch });
//         const res = await client.projectRequest_GetById(Number(id));
//         setData(res);
//         setStage((res.projectRequestStage) ?? "Pending");

//         setFieldLookups({
//           projectRequestStage: {
//             Pending: "Pending",
//             Approved: "Approved",
//             "Changes Requested": "Changes Requested"
//           }
//         });
//       } catch (ex) {
//         console.error(ex);
//         setError("Failed to load project request.");
//       }
//     };
//     load();
//   }, [id, authFetch]);
//   useEffect(() => {
//     if (!data) return;

//     const employeeIds = [
//       data.projectManager,
//       data.supervisor,
//       data.principalInCharge
//     ].filter(Boolean);

//     const clientIds = [
//       data.primaryClient,
//       data.billingClientName
//     ].filter(Boolean);

//     const loadLookups = async () => {
//       const employeeClient = new EmployeeClient("", { fetch: authFetch });
//       const clientClient = new ClientClient("", { fetch: authFetch });
//       const orgClient = new OrganizationClient("", { fetch: authFetch });

//       if (employeeIds.length) {
//         const emps = await Promise.all(
//           employeeIds.map(id => employeeClient.employee_GetById(id as string))
//         );
//         setEmployeesById(
//           Object.fromEntries(emps.map(e => [e.employee!, e]))
//         );
//       }

//       if (clientIds.length) {
//         const clients = await Promise.all(
//           clientIds.map(id => clientClient.client_GetById(id as string))
//         );
//         setClientsById(
//           Object.fromEntries(clients.map(c => [c.clientId!, c]))
//         );
//       }

//       if (data.organization) {
//         const org = await orgClient.organization_GetById(data.organization);
//         setOrganizationsById({ [data.organization]: org });
//       }
//     };

//     loadLookups();
//   }, [data, authFetch]);


//   const updateStage = async (nextStage: ProjectRequestStage) => {
//     if (!data || data.projectRequestId == null) return;

//     try {
//       setSaving(true);
//       setError(null);

//       const client = new ProjectRequestClient("", { fetch: authFetch });

//       const delta = new ProjectRequestDeltaDto({
//         projectRequestStage: nextStage
//       });

//       const updated = await client.projectRequest_Patch(
//         data.projectRequestId,
//         delta
//       );
//       setData(updated);
//       setStage(updated.projectRequestStage ?? "Pending");
//     } catch (e) {
//       console.error(e);
//       setError("Failed to update project request. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const rowData = useMemo(() => {
//     if (!data) return [];

//     const rows: { label: string; value: string }[] = [];

//     Object.entries(data)
//       .filter(([key]) => !key.startsWith("$"))
//       .forEach(([key, value]) => {
//         let displayValue = "";

//         switch (key) {
//           case "projectManager":
//           case "principalInCharge":
//           case "supervisor":
//             displayValue =
//               employeesById[value as string]
//                 ? `${employeesById[value as string].titleName}`
//                 : String(value ?? "");
//             break;

//           case "primaryClient":
//           case "billingClientName":
//             displayValue =
//               clientsById[value as string]
//                 ? `${clientsById[value as string].name}`
//                 : String(value ?? "");
//             break;

//           case "organization":
//             displayValue =
//               organizationsById[value as string]?.name ?? String(value ?? "");
//             break;

//           case "projectRequestStage":
//             displayValue =
//               fieldLookups.projectRequestStage[value as string] ??
//               String(value ?? "");
//             break;

//           default:
//             displayValue =
//               value instanceof Date
//                 ? value.toLocaleDateString()
//                 : String(value ?? "");
//         }

//         rows.push({
//           label: camelToUserFriendly(key),
//           value: displayValue
//         });
//       });

//     return rows;
//   }, [data, employeesById, clientsById, organizationsById, fieldLookups]);


//   if (!data) return <Spinner />;

//   return (

//     <>
//       <h1 className="mb-3">Review Project Request</h1>

//       {/* Status Indicator */}
//       <div className="mb-3">
//         <strong>Status: </strong>
//         <Badge
//           color={
//             stage === "Approved"
//               ? "success"
//               : stage === "Changes Requested"
//                 ? "warning"
//                 : "warning"
//           }
//         >
//           {stage}
//         </Badge>
//       </div >
//       {/* Details Grid */}
//       <Row className="gy-3 mb-4">
//         {rowData.map(r => (
//           <Col xs={12} md={6} key={`${r.label}-${r.value}`}>
//             <label className="form-label mb-0">{r.label}</label>
//             <div className="form-control-plaintext">{r.value}</div>
//           </Col>
//         ))}
//       </Row>


//       {error && (
//         <div className="text-danger mt-3">
//           {error}
//         </div>

//       )}
//       <div className="mt-4 d-flex gap-3">
//         <Button
//           color="success"
//           onClick={() => updateStage("Approved")}
//           disabled={saving || isApproved}
//         >
//           {saving && !isApproved ? "Saving..." : isApproved ? "Approved" : "Approve"}
//         </Button>
//         <Button
//           color="warning"
//           className="text-white"
//           onClick={() => updateStage("Changes Requested")}
//           disabled={saving || isApproved}
//         >
//           Request Changes
//         </Button>
//       </div>
//     </>
//   );
// }
