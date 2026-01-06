import { HashRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter.jsx";
import "./styles/main.scss";

export default function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}
