import { Link, Route, Router } from "wouter";
import "./App.css";
import Login from "./components/login";
import { ROLES } from "./constants";
import celulares from "./pages/celulares";
import Usuarios from "./pages/usuarios";
import { useAuthStore } from "./store/auth";

function App() {
  const user = useAuthStore((data) => data.user);

  const roles = user?.roles ?? [];

  const isAdmin = roles.includes(ROLES.ADMIN);

  return (
    <Router>
      <h1 className="title-body">CELULARES LIBRES</h1>
      <Route path="/">
        {user && <h1>Bienvenido/a {user.name}</h1>}
        <Login />
        <ul className="link-user">
          <li>
            <Link to="/celulares">Ir a Celulares →</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/users">Ir a Usuarios →</Link>
            </li>
          )}
        </ul>
      </Route>
      <Route path="/celulares" component={celulares} />
      {isAdmin && <Route path="/usuarios" component={Usuarios} />}
    </Router>
  );
}

export default App;
