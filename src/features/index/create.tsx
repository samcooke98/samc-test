import { Link } from "react-router-dom";

export function create() {
  return () => (
    <div>
      <h3>Index Route</h3>
      <Link to="/folder">Folder Page</Link>
    </div>
  );
}
