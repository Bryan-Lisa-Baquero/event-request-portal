import { SelectTileScreen } from "../SelectTileScreen";

export default function EntryTileScreen() {
    return(
        <>
            <SelectTileScreen linkLabels={[ { link: "pre-award", label: "Pre-Award" }, { link: "post-award", label: "Post-Award" } ]} />
        </>
    )
}