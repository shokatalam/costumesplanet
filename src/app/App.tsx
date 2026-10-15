import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { router } from "./routes";

export default function App() {
  useEffect(() => {
    document.title = "CostumesPlanet — Costume & Cosplay Guides for Every Character";
  }, []);
  return <RouterProvider router={router} />;
}