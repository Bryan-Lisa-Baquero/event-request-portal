
import { useParams } from "react-router-dom";
import NotificationCard from "../components/cards/NotificationCard";
export default function ProjectRequestSuccess() {
    const { id } = useParams<{ id: string }>();
  return (
<NotificationCard
  headerOne={`Your Submission ID is #${id}`}
  headerTwo="Thank you for your submission!"
  body="Your submission has been received and is now pending review."
  linkLabels={[
    { label: "Return to Portal", to: "/" }
  ]}
/>  
  );
}