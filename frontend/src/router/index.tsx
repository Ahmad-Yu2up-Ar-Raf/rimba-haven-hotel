import { createBrowserRouter } from "react-router";
import { RouteLayout } from "@/components/layout/RouteLayout";
import { About } from "@/pages/About";
import { Booking } from "@/pages/Booking";
import { Home } from "@/pages/Home";
import { Pricing } from "@/pages/Pricing";
import { Rooms } from "@/pages/Rooms";

export const router = createBrowserRouter([
  {
    element: <RouteLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/kamar", element: <Rooms /> },
      { path: "/harga", element: <Pricing /> },
      { path: "/tentang", element: <About /> },
      { path: "/pesan", element: <Booking /> },
    ],
  },
]);
