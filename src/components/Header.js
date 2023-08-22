import "./Header.css";

import { useData } from "../context/DataContext";

function Header() {
  const { query, dispatch } = useData();

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Geektrust - Admin UI</span>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search for name, email or role"
          aria-label="Search"
          value={query}
          onChange={(e) =>
            dispatch({ type: "search", payload: e.target.value })
          }
        />
      </div>
    </nav>
  );
}

export default Header;
