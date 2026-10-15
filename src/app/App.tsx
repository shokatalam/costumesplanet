import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { router } from "./routes";

export default function App() {
  useEffect(() => {
    document.title = "CostumesPlanet — #1 Costume & Cosplay Guide Directory";
  }, []);
  return <RouterProvider router={router} />;
}