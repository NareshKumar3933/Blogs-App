import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import NavBar from "./components/NavBar";


export default function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateBlog />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}