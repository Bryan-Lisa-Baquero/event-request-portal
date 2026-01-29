import type { JSX } from "react";

/**
 * Status Page Component.
 * Renders information about status and task updates.
 * @component           
 * @returns 
 * {JSX.Element} The rendered Status page.
 * @remarks
 * This page provides users with information on how to update status and tasks efficiently.    
 * @see React
 */
export default function Status(): JSX.Element {
    return(
        <>
            <h1>4. Status and Task Updates</h1>
            <p>Users can quickly update status, upload attachments, or add simple notes in one or two clicks.</p>
        </>
    )
}