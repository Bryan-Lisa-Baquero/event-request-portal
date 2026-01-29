import type { JSX } from "react";
import { LiaTruckPickupSolid } from "react-icons/lia";
import { TbSteeringWheel } from "react-icons/tb";
import type { ButtonCardProps } from "../components/cards/ButtonCard";
import ButtonCardList from "../components/cards/ButtonCardList";
import { IoFlaskSharp } from "react-icons/io5";
import { useAuthContext } from "../auth/useAuthContext";
import { FaChartPie } from "react-icons/fa";
/**
 * Reporting Tools Page Component.
 * Renders reporting tool options for users.  
 *  @component
 *  @returns {JSX.Element} The rendered Reporting Tools page.
 *  @remarks
 * This page provides access to various reporting tools, including links to external reporting dashboards. 
 * @see ButtonCardList
 * @see LiaTruckPickupSolid
 * 
 */                  
export default function ReportingTools(): JSX.Element {

    const reports: ButtonCardProps[] = [
        {
            description: "PRIME Fleet Management",
            icon: <LiaTruckPickupSolid />,
            routePath: "https://app.powerbi.com/view?r=eyJrIjoiN2E0N2U1MzAtNzY4OS00M2NmLTkzMDUtMTEzYzJlNGI5OGU0IiwidCI6ImQxZTRiOGNmLTY4ZmUtNGQxOC05OGQ1LWI3ZTljOTkxNzNjZiIsImMiOjN9"
        },
        {
            description: "Mileage Log Backup Documentation",
            icon: <TbSteeringWheel />,
            routePath: "https://app.powerbi.com/view?r=eyJrIjoiMTU4OTU1NDEtNTRiYy00ZGUzLTk3MDAtZGI3NzU3NGMwOWQ4IiwidCI6ImQxZTRiOGNmLTY4ZmUtNGQxOC05OGQ1LWI3ZTljOTkxNzNjZiIsImMiOjN9"
        },
        {
            description: "AR Dashboard",
            icon: <IoFlaskSharp />,
            routePath: "https://app.powerbi.com/Redirect?action=OpenReport&appId=1e185990-bfff-4789-9d1e-e1b072ddf9d9&reportObjectId=64a9240b-51e6-4b5f-8718-93eb14d37cd9&ctid=d1e4b8cf-68fe-4d18-98d5-b7e9c99173cf&reportPage=706ba9743bba8568bb3e&pbi_source=appShareLink&portalSessionId=6c14b152-4fb3-4eec-a3d4-8668dc7a3f87"
        },
        {
            description: "Utilization Dashboard",
            icon: <FaChartPie />,
            routePath: "https://app.powerbi.com/view?r=eyJrIjoiM2JlNTY2OTktZjg3NS00MmE0LWE0OTQtZDAwNmIzMDU0MjIxIiwidCI6ImQxZTRiOGNmLTY4ZmUtNGQxOC05OGQ1LWI3ZTljOTkxNzNjZiIsImMiOjN9",
            requiredRole: "CORP_KPI"
        }
    ]

    const { roles, rolesLoaded } = useAuthContext();

    const filteredReports = reports.filter(r => {
        if (!r.requiredRole) return true;
        return roles.includes(r.requiredRole);
    });

    return (
        <>
            <h1 className="pb-5">Reporting Tools</h1>
            {rolesLoaded && <ButtonCardList buttonCards={filteredReports} />}
        </>
    )
}