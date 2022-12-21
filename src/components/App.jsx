// Dependences.
import React, {Component} from "react";
//import Board from "./Board.jsx";
import Login from "./Login.jsx";
import "../styles/app.css";

// App class creating definition.
export default class App extends Component {
    // Gives page render from jsx language.
    render = () => <div className = "payment-system"><Login/></div>;
}
