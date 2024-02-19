import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Apollo Client Issue Reproduction</h1>
        <p>
          This application can be used to demonstrate an error in Apollo Client.
        </p>
      </header>
      <div className="Grid-column">
        <Outlet />
      </div>
    </div>
  );
}
