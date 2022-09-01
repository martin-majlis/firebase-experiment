import { Outlet } from "react-router-dom";

function Entries() {
  return (
    <div>
      <h1>Entries</h1>
      <Outlet />
    </div>
  );
}

export default Entries;
