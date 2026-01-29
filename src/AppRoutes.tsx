import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectRequestSuccess from "./pages/ProjectRequestSuccess";
import Status from "./pages/Status";
import CloseOut from "./pages/CloseOut";
import LogoutPage from "./pages/Logout";
import InDevelopment from "./pages/InDevelopment";
import ManagementTools from "./pages/ManagementTools";
import NotFound from "./pages/NotFound";
import ReportingTools from "./pages/ReportingTools";
import ProjectRequestReview from "./pages/projectRequestReview";
// import ProjectRequestReviewDetail from "./pages/projectRequestReviewDetail";
import ProjectRequestCreate from "./pages/projectRequestCreate";
import { ProjectRequestEdit } from "./pages/projectRequestEdit";

export default function AppRoutes() {

    return(
        <Routes>
            {/* Landing Page */}
            <Route path='/' element={<Home />} />
            {/* Management Routes */}          
            <Route path='/management' element={<ManagementTools />} />

            <Route path="/management/project-request/success/:id" element={<ProjectRequestSuccess />} />
            <Route path='/management/project-request' element={<ProjectRequestReview />} />
            <Route path='/management/project-request/create' element={<ProjectRequestCreate />} />
            <Route path='/management/project-request/:id' element={<ProjectRequestEdit />} />
            <Route path='/management/client/modify' element={<InDevelopment />} />
            <Route path='/management/client/setup' element={<InDevelopment />} />
            <Route path='/management/project/modify' element={<InDevelopment />} />


            {/* Reporting Routes */}
            <Route path='/reporting' element={<ReportingTools />} />

            {/* Forecasting Routes */}
            <Route path='/forecasting' element={<InDevelopment />} />

            {/* Help Routes */}
            <Route path='/help' element={<InDevelopment />} />

            {/* These two may be deprecated. Part of initial specs, may come back later. */}
            <Route path='/status' element={<Status />} />
            <Route path='/close-out' element={<CloseOut />} />

            {/* Log Out */}
            <Route path='/logout' element={<LogoutPage />} />

            {/* 404 */}
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}