import { useEffect } from "react";
import Header from "../components/Header/Header"; 
import Footer from "../components/Footer/Footer";
import FertilizationPlanner from "./FertilizationPlanner";

const Home = () => {
  return (
    <div className="p-4">
      <Header />
    <FertilizationPlanner/>

      <Footer/>
    </div>
  );
};

export default Home;