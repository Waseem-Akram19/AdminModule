import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar} from "cdbreact";
import FoodGrid from './FoodGrid.png';

const Navbar = () => {
	return (
        <Header style={{background:"#373656", color:"#FFF"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
          <a href="/" className="text-decoration-none" style={{ color: "inherit" }}>
            <img src={FoodGrid} alt="Foodgrid" height={68.5}></img>
          </a>
          </CDBNavbar>
        </Header>
	);
}

export default Navbar;
