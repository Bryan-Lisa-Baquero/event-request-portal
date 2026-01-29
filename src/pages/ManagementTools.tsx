/**
 * 
 * Looks like Client Tools, Project Tools and Employee Tools are the old agent card list (icon, header, description) 
 * with a searchbar at the bottom that expands to whatever the width of those two are
 * 
 * The list itself should take a header too. Initialized like <InfoCardList icon={<SomeIcon />} header="Client Tools" cards={myInfoCards} searchBar="Client" /> 
 * -  searchbar will probably build a nested component that uses the passed in string for display and API calls
 * 
 * Let's copy over that type of card list - maybe ButtonCardDescription and a reusable lookup input
 * 
 * @todo: needs client lookups. will need a new api route that accepts filters. Needs Project Lookups.
 */

import type { JSX } from "react";
import InfoCardList, { type InfoCardListProps } from "../components/cards/InfoCardList";
import { FaPersonChalkboard } from "react-icons/fa6";
import { GrPowerCycle, GrDocumentText  } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
/**
 * Management Tools Page Component.
 *  Renders management tool options for clients and projects.
 * @component
 * @returns {JSX.Element} The rendered Management Tools page.
 * @remarks    
 * This page provides access to various management tools, including client and project setup and modification forms.
 * @see InfoCardList
 * @see FaPersonChalkboard
 * @see GrPowerCycle
 * @see GrDocumentText
 */
export default function ManagementTools(): JSX.Element {

    const clientTools: InfoCardListProps = {
        title: "Client Tools",
        infoCards: [
            {
                header: "Client Setup",
                description: "Initial Client Request form. Use this form to request a new client to be added. This will kickoff a formal approval process.",
                icon: <FaPersonChalkboard />,
                routePath: "client/setup"
            },
            {
                header: "Client Modification",
                description: "Client Modification Request form. Use this form to request edits to an existing client. This will kickoff a formal approval process.",
                icon: (
                    <>
                        <FaPersonChalkboard />
                        <GrPowerCycle />
                    </>
                ),
                routePath: "client/modify"
            }
        ]
    }

    const projectTools: InfoCardListProps = {
        title: "Project Tools",
        infoCards: [
        {
            header: "Project Setup",
            description: "Initial Project Request form. Use this form to request a new project to be added. This will kickoff a formal approval process.",
            icon: <GrDocumentText />,
            routePath: "project-request/create"
        },
        {
            header: "Project Modification",
            description: "Project Modification Request form. Use this form to request edits to an existing project. This will kickoff a formal approval process.",
            icon: (
                <>
                    <GrDocumentText />
                    <GrPowerCycle />
                </>
            ),
            routePath: "project/modify"
        },
        {
            header: "Project Request Review", // new card
            description: "Review all project requests. Approve or deny requests, edit fields, and track incremental changes.",
            icon: (
                <>
                    <GrDocumentText />
                    <FaSearch /> {/* search icon to indicate lookup/review */}
                </>
            ),
        routePath: "project-request" // route to new review screen
    }
]
}

    return(
        <>
            <h1 className="pb-5">Management Tools</h1>
            <InfoCardList title={projectTools.title} infoCards={projectTools.infoCards} />
            <InfoCardList title={clientTools.title} infoCards={clientTools.infoCards} />
            
        </>
        

    );
}