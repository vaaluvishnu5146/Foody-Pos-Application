import { Outlet } from "react-router-dom";
import StoreLayout from "./StoreLayout";

export default function Home() {
  return (
    <StoreLayout>
      <Outlet />
    </StoreLayout>
  );
}
