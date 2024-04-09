import Sidebar from "../Components/Sidebar";

export default function StoreLayout({ children }) {
  return (
    <div className="container d-flex gap-10 ">
      <Sidebar />
      {children}
    </div>
  );
}
