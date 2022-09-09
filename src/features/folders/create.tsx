import { Link } from "react-router-dom";

export function create() {
  return () => (
    <div>
      <h3>Folders</h3>
      <p>Hello World. I am a folders page</p>

      <Link to="/">Back Home</Link>
    </div>
  );
}
