import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Instructors from "./pages/Instructors";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import Talent from "./pages/Talent";
import ContactUs from "./pages/ContactUs";
// import DancerApplicationForm from "./pages/DancerApplicationForm";
import DanceWorkshopForm from "./pages/DanceWorkshopForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "events", Component: Events },
      { path: "instructors", Component: Instructors },
      { path: "about", Component: AboutUs },
      { path: "faq", Component: FAQ },
      { path: "talent", Component: Talent },
      { path: "contact", Component: ContactUs },
      // { path: "dancer-application", Component: DancerApplicationForm },
      { path: "workshop-form", Component: DanceWorkshopForm },
    ],
  },
]);