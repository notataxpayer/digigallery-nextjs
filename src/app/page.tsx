import Image from "next/image";
import Home from "./components/pages/Home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


export default function App() {
  return (
    <div className="font">
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  );
}
