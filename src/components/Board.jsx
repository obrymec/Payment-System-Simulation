// Dependencies.
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import BasicsTools from "../vendors/basics_tools.js";
import EventsManager from "./EventsManager.jsx";
import Transactions from "./Transactions.jsx";
import UserAccount from "./UserAccount.jsx";
import React, {PureComponent} from "react";
import Activities from "./Activities.jsx";
import "../styles/board.css";
import API from "./API.jsx";
import $ from "jquery";

// Dashboard class definition.
export default class Dashboard extends PureComponent {
    // Constructor definition.
    constructor (props) {
        // Calls the mother class constructor.
        super (props);
        // Initializes component state and attributes.
        this.show_searcher = false;
        this.show_slider = false;
        this.state = {
            username: "Akakpo David"
        };
    }

    // Called when any page has been destroyed.
    _on_page_destroyed = data => {}

    // Called when the browser window size has been changed.
    _on_window_size_changed = () => {
        // Contains the current title height.
        let title_height = BasicsTools.get_css_value ($ ("div.static-title").css ("height"));
        // Updates the views manager height for each browser window resize.
        $ ("div.views").css ("height", ((window.innerHeight - title_height) + "px"));
    }

    // Manages slider menu visibility.
    slider_menu_bar_visibility = (parent, child) => {
        // The slider menu bar is it visible ?
        if (!this.show_slider) {
            // Shows the slider menu bar.
            parent.setAttribute ("title", "Cacher la barre de menu.");
            child.setAttribute ("fill", "#34b7f1");
            this.show_slider = true;
        // Otherwise.
        } else {
            parent.setAttribute ("title", "Afficher la barre de menu.");
            child.setAttribute ("fill", "#FFF");
            this.show_slider = false;
        }
    }

    // Called when any page has been loaded.
    _on_page_ready = (data) => {
        // Updates the page title.
        BasicsTools.animate_text (BasicsTools.__ ("div.big-title > label"), data.title, 35);
        this._on_window_size_changed ();
        // For transactions page.
        if (data.name === "transactions-page") {
            // Some transactions are available ?
            $ ("div.search-icon > svg").css ("visibility", (data.trlen ? "visible" : "hidden"));
        // For others web pages.
        } else {
            // Contains search icon container reference.
            let src_container = BasicsTools.__ ("div.search-icon");
            // Destroys transactions searcher manager.
            if (this.show_searcher) this.search_bar_visibility (src_container, src_container.children[0]);
            // Hides the search manager for other web pages.
            $ ("div.search-icon > svg").css ("visibility", "hidden");
        }
    }

    // Manages search bar visibility.
    search_bar_visibility = (parent, child) => {
        // Contains the search field html tag reference.
        let search_field = BasicsTools.__ ("div.message-ctn > input");
        // The searcher is it visible ?
        if (!this.show_searcher) {
            // Shows the search bar manager and his children.
            child.children[0].children[0].setAttribute ("fill", "#34b7f1");
            parent.setAttribute ("title", "Annuler la recherche.");
            $ ("div.toolbar").css ("transform", "translateY(0)");
            this.show_searcher = true;
            search_field.focus ();
        // Otherwise.
        } else {
            // Hides the search bar manager and his children.
            parent.setAttribute ("title", "Rechercher l'identifiant d'une transaction.");
            child.children[0].children[0].setAttribute ("fill", "#FFF");
            $ ("div.toolbar").css ("transform", "translateY(100%)");
            search_field.value = String ('');
            this.show_searcher = false;
            search_field.blur ();
        }
    }

    // Called when the component is loaded and ready to use.
    componentDidMount = () => {
        // Contains the settings icon container reference.
        let container = BasicsTools.__ ("div.settings-icon"), src_container = BasicsTools.__ ("div.search-icon");
        // Fixing click event to the settings svg icon.
        container.children[0].addEventListener ("click", () => this.slider_menu_bar_visibility (container, container.children[0]));
        // Fixing click event to the search svg icon.
        src_container.children[0].addEventListener ("click", () => this.search_bar_visibility (src_container, src_container.children[0]));
        // Fixing click event to search bar field validator svg icon.
        BasicsTools.__ ("div.send-icon").addEventListener ("click", () => this.search_bar_visibility (src_container, src_container.children[0]));
        // Fixing keydown event to search input field.
        BasicsTools.__ ("div.message-ctn > input").addEventListener ("keydown", event => {
            // Whether the user press on "Enter" keyboard key.
            if (event.key === "Enter") this.search_bar_visibility (src_container, src_container.children[0]);
        });
    }

    // Gets the component render.
    render = () => <BrowserRouter><div className = "dashboard fixed">
        <div className = "slider-menu">
            <div className = "user-profil">
                <div className = "profil-icon">
                    <svg viewBox = "0 0 24 24" width = "38px" height = "38px" fill = "#fff">
                        <g><path d = {`M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,4c2.2,0,4,2.2,
                        4,5s-1.8,5-4,5 s-4-2.2-4-5S9.8,4,12,4z M18.6,19.5C16.9,21,14.5,22,12,22s-4.9-1-6.6-2.5c-0.4-0.4-0.5-1-0.1-1.4c1.1-1.3,
                        2.6-2.2,4.2-2.7 c0.8,0.4,1.6,0.6,2.5,0.6s1.7-0.2,2.5-0.6c1.7,0.5,3.1,1.4,4.2,2.7C19.1,18.5,19.1,19.1,18.6,19.5z`}/></g>
                    </svg>
                </div><div className = "user-name"><label>{BasicsTools.str_skrink (this.state.username, 10)}</label></div>
            </div>
            <div className = "menu-options">
                <NavLink to = "/transactions" style = {{textDecoration: "none"}}>
                    <div className = "transactions option" title = "Consulter les transactions en attente de validation.">
                        <div className = "option-icon">
                            <svg viewBox = "0 0 48 48" width = "24px" height = "24px" fill = "#fff" transform = "translate(0, 3)">
                                <path d = {`M8,13h6V37.84a3,3,0,0,0,1.41,2.55C16.34,41,16.78,42,18.33,42c2.17,0,2.17-2,4.33-2s2.17,2,4.33,2,
                                2.17-2,4.34-2,2.16,2,4.33,2c1.56,0,2-1,2.93-1.61A3,3,0,0,0,40,37.84V11a5,5,0,0,0-5-5H11a4.62,4.62,0,0,
                                0-1,.1h0A5,5,0,0,0,6,11,2,2,0,0,0,8,13ZM35,8a3,3,0,0,1,3,3V37.84a1,1,0,0,1-.48.85,7.84,7.84,0,0,
                                0-1.05.84c-.49.45-.54.47-.81.47s-.32,0-.81-.47a4.83,4.83,0,0,0-7,0c-.49.45-.54.47-.81.47s-.31,0-.8-.47a4.83,
                                4.83,0,0,0-7,0c-.49.45-.54.47-.81.47s-.31,0-.8-.47a7.25,7.25,0,0,0-1.05-.84,1,1,0,0,1-.48-.85V11a7,7,0,0,
                                0-.67-3Zm-24.78.1h0l.21,0A3.06,3.06,0,0,1,11,8a3,3,0,0,1,2.12.87,3.1,3.1,0,0,1,.82,1.53A5.8,5.8,0,0,1,14,
                                11H8A3,3,0,0,1,10.22,8.1Z`}/>
                                <path d = "M29,14h6a1,1,0,0,0,0-2H29a1,1,0,0,0,0,2Z"/><path d = "M29,18h6a1,1,0,0,0,0-2H29a1,1,0,0,0,0,2Z"/>
                                <path d = "M29,22h6a1,1,0,0,0,0-2H29a1,1,0,0,0,0,2Z"/><path d = "M19,27H35a1,1,0,0,0,0-2H19a1,1,0,0,0,0,2Z"/>
                                <path d = "M19,31H35a1,1,0,0,0,0-2H19a1,1,0,0,0,0,2Z"/><path d = {`M20,22h4a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2H20a2,
                                2,0,0,0-2,2v6A2,2,0,0,0,20,22Zm0-8h4v6H20Z`}/>
                            </svg>
                        </div><div className = "option-text"><label>Transactions</label></div>
                    </div>
                </NavLink>
                <NavLink to = "/user-account" style = {{textDecoration: "none"}}>
                    <div className = "account option" title = "Consulter les informations à propos de mon compte.">
                        <div className = "option-icon">
                            <svg viewBox = "0 0 32 32" width = "23px" height = "23px" fill = "#fff" transform = "translate(0, 2)">
                                <path d = "M22.56,16.53a9.95,9.95,0,0,1-13.12,0A15,15,0,0,0,1,30a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1A15,15,0,0,0,22.56,16.53Z"/>
                                <circle cx = "16" cy = '9' r = '8'/>
                            </svg>
                        </div><div className = "option-text"><label>Mon compte</label></div>
                    </div>
                </NavLink>
                <NavLink to = "/activities" style = {{textDecoration: "none"}}>
                    <div className = "activities option" title = "Consulter l'historique des transactions éffectuées.">
                        <div className = "option-icon">
                            <svg viewBox = "0 0 91 91" width = "24px" height = "24px" fill = "#fff" transform = "translate(0, 2)">
                                <g><path d = {`M89.3,49c-5.7-3.5-10.8-8.1-15.3-13.1c-3.6-4.1-9.9,2.1-6,6c2.2,2.2,4.6,4,7.1,5.7c-5.5,
                                0.4-11.3,0.8-16.3-0.1 c-3.2-11.1-3.7-22.9-4.3-34.3C54.2,8.3,47.2,7,45.8,12c-4,13.9-6.3,28.1-9.3,
                                42.2c-1.4-7.5-2.7-15-3.3-22.7 c-0.3-3.3-4.8-5.1-6.7-1.8c-1.9,3.5-3.7,7-5.5,10.5c-1.1,2.3-3.5,9.6-5.8,
                                10.7c-3.4,1.6-9.6,0.6-13.6,1.1c-2,0.3-1.7,3.3,0,3.8 c4.4,1.2,12.9,2.9,17,0.8c2.7-1.3,4.3-5.4,
                                5.6-7.8c1-1.7,1.9-3.5,2.8-5.2c1.1,10.9,2.8,21.8,4.7,32.5c0.8,4.6,7.6,4,8.8,0 C43.8,64.7,46,53,
                                48.2,41.3c0.4,4.3,1,8.9,2.8,11.7c2.2,3.4,5.8,3.4,9.7,3.7c4,0.3,8,0.4,12.1,0.4c-2.3,1.8-4.3,
                                3.8-5.8,6.3 c-1.9,3.1,2.2,5.6,4.7,3.6c5.7-4.4,11.7-8.2,17.6-12.3C91.3,53.3,91.6,50.4,89.3,49z`}/></g>
                            </svg>
                        </div><div className = "option-text"><label>Activités</label></div>
                    </div>
                </NavLink>
                <NavLink to = "/api" style = {{textDecoration: "none"}}>
                    <div className = "api option" title = "">
                        <div className = "option-icon">
                            <svg enableBackground = "new 0 0 32 32" height = "24px" viewBox = "0 0 32 32" width = "24px"
                            fill = "#fff" transform = "translate(0, 2)">
                                <g><rect fill = "none" height = "24px" width = "24"/></g><g><polygon points = "0,6 14,6 14,14 10,14 10,18 14,18 14,26 0,26"/>
                                <polygon points = "20,18 16,18 16,14 20,14 20,10 32,10 32,22 20,22"/></g>
                            </svg>
                        </div><div className = "option-text"><label>API</label></div>
                    </div>
                </NavLink>
                <div className = "logout option" title = "Se déconnecter maintenant de l'application.">
                    <div className = "option-icon">
                        <svg height = "24px" viewBox = "0 0 128 128" width = "24px" fill = "#fff" transform = "translate(0, 2)">
	                        <g><path d = {`M100.143,32.911c-6.521-6.528-14.839-11.293-24.127-13.534v14.277 c5.483,1.86,10.395,4.951,
                            14.417,8.967c6.775,6.787,10.945,16.088,10.948,26.433c-0.003,10.346-4.173,19.647-10.948,26.433 c-6.786,
                            6.774-16.088,10.945-26.433,10.949c-10.344-0.004-19.646-4.175-26.433-10.949c-6.775-6.785-10.945-16.087-10.949-26.433 
                            c0.003-10.344,4.173-19.646,10.949-26.433c4.023-4.017,8.934-7.106,14.417-8.967V19.376c-9.288,2.241-17.607,
                            7.006-24.127,13.534 c-9.239,9.229-14.974,22.05-14.971,36.143c-0.003,14.094,5.731,26.916,14.971,36.143c9.229,
                            9.238,22.05,14.974,36.143,14.972 c14.093,0.002,26.915-5.733,36.143-14.972c9.24-9.227,14.975-22.049,
                            14.971-36.143C115.117,54.961,109.383,42.139,100.143,32.911z`}/>
	                        <g><polyline points = "70.865,61.521 70.865,7.833 57.134,7.833 57.134,61.521"/></g></g>
                        </svg>
                    </div><div className = "option-text"><label>Déconnexion</label></div>
                </div>
            </div>
        </div>
        <div className = "page-data">
            <div className = "static-title">
                <div className = "big-title"><label></label></div>
                <div className = "search-icon" title = "Rechercher l'identifiant d'une transaction.">
                    <svg viewBox = "0 0 18 18" width = "22px" height = "22px">
                        <g fill = "none" fillRule = "evenodd" stroke = "none" strokeWidth = '1'>
                        <g fill = "#FFF" transform = "translate(-339.000000, -381.000000)"><g transform = "translate(339.000000, 381.000000)">
                        <path d = {`M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,
                        2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,
                        16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z`}/>
                        </g></g></g>
                    </svg>
                </div><div className = "settings-icon" title = "Afficher la barre de menu.">
                    <svg viewBox = "0 0 32 32" width = "24px" height = "24px" fill = "#FFF">
                        <g><path d = "M28,10H4A1,1,0,0,1,4,8H28a1,1,0,0,1,0,2Z"/><path d = "M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
                        <path d = "M28,24H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/></g><g><rect fill = "none" height = "32px" width = "32px"/></g>
                    </svg>
                </div>
            </div><div className = "views">
                <Routes>
                    <Route exact = {true} path = "/transactions" element = {<Transactions ready = {this._on_page_ready} destroyed = {this._on_page_destroyed}/>}/>
                    <Route exact = {true} path = "/user-account" element = {<UserAccount ready = {this._on_page_ready} destroyed = {this._on_page_destroyed}/>}/>
                    <Route exact = {true} path = "/activities" element = {<Activities ready = {this._on_page_ready} destroyed = {this._on_page_destroyed}/>}/>
                    <Route exact = {true} path = "/api" element = {<API ready = {this._on_page_ready} destroyed = {this._on_page_destroyed}/>}/>
                </Routes>
            </div><div className = "toolbar">
				<div className = "message-ctn"><input type = "text" placeholder = "Rechercher" title = "Chercher un élément."/></div>
				<div className = "send-icon" title = "Lancer la recherche.">
					<svg viewBox = "0 0 24 24" height = "24px" width = "24px" fill = "#FFF">
						<g><path d = {`M21.5,11.1l-17.9-9C2.7,1.7,1.7,2.5,2.1,3.4l2.5,6.7L16,12L4.6,13.9l-2.5,6.7c-0.3,0.9,0.6,1.7,1.
                        5,1.2l17.9-9 C22.2,12.5,22.2,11.5,21.5,11.1z`}/></g>
					</svg>
				</div>
            </div>
        </div><EventsManager reference = {window} callback = {this._on_window_size_changed} event = "resize"/>
    </div></BrowserRouter>;
}
