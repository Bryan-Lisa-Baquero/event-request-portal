import type { JSX } from "react";
import { ProjectRequestWizard } from "../components/entry/ProjectRequestWizard";

/**
 * Wrapper for Project Request Wizard
 * @component
 * @returns {JSX.Element} The creation page which in turn is the project request wizard.
 *  @remarks
 * This page renders the project request wizard, guiding users through the process of creating a projectrequest
 * @see ProjectRequestWizard
 */
export default function ProjectRequestCreate() : JSX.Element {

    return(
        <ProjectRequestWizard />
    )
}