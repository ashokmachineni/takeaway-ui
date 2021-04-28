import logo from "./logo.svg";
import "./App.css";
import Items from "./Items";
import MenuBar from "./components/menubar/MenuBar";
import ItemGrid from "./ItemGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="container mx-auto">
      <MenuBar />
      <Items />
    </div>
  );
}

export default App;
