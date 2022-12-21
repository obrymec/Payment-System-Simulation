// Dependencies.
import BasicsTools from "../vendors/basics_tools.js";
import React, {PureComponent} from "react";
import "../styles/login.css";
import $ from "jquery";

// Login class definition.
export default class Login extends PureComponent {
    // Constructor definition.
    constructor (props) {
        // Gets the parent constructor.
        super (props);
        // Initializes component state and attributes.
        this.process_id = null;
        this.checking = false;
        this.is_guest = true;
    }

    // Hightlights a field.
    _field_unhightlight = event => $ (event.target).css ("font-weight", "normal").css ("box-shadow", "0 0 8px silver");

    // Hightlights a field.
    _field_hightlight = event => $ (event.target).css ("font-weight", "bold").css ("box-shadow", "0 0 8px #06453d");

    // Shows clear icon.
    _show_clear_icon = event => this._show_hide_input_elements_manager (event.target, "#06453d", "#06453d");

    // Hides clear icon.
    _hide_clear_icon = event => this._show_hide_input_elements_manager (event.target, "grey", "silver");

    // Submit button hover on.
    _submit_button_hover_on = event => {
        // A request has it been launched ?
        if (!this.checking) $ (event.target).css ("box-shadow", "0 0 4px #000").css ("background-color", "#06453d");
    }

    // Submit button hover off.
    _submit_button_hover_off = event => {
        // A request has it been launched ?
        if (!this.checking) $ (event.target).css ("box-shadow", "0 2px 3px gray").css ("background-color", "#075e54");
    }

    // Sumit button click.
    _submit_button_click = () => {
        // A request has it been launched ?
        if (!this.checking) {
            // Loads data from the server.
            this.checks_entries (false);
            // Checks entries.
            window.setTimeout (() => this.checks_entries (true), 10000);
        }
    }

    // Elements show/hide manager.
    _show_hide_input_elements_manager = (ref, color1, color2) => {
        // For any element without svg path element.
        if (String (ref) === "[object HTMLInputElement]") {
            // Contains all icons references.
            let icons = [ref.parentNode.children[0].children[0], ref.parentNode.children[2].children[0]];
            // Changes icon clear color.
            icons[0].setAttribute ("fill", color1);
            // The top icon color to whatsapp theme.
            icons[1].setAttribute ("fill", color2);
            // The guest icon is it defined ?
            if (!BasicsTools.is_empty (ref.parentNode.children[0].children[1])) {
                // Sets guest icon fill color.
                ref.parentNode.children[0].children[1].children[0].setAttribute ("fill", color2);
                ref.parentNode.children[0].children[1].children[1].setAttribute ("fill", color2);
            }
        }
    }

    // Checks the user entries.
    checks_entries = (stop = false) => {
        // Getting the connection button reference.
        let option = BasicsTools.__ ("div.options > input[type='button']");
        // Checks the passed value.
        if (!stop) {
            // Disables submit button.
            $ ("div.email-zone input[type='email'], div.pass-cls-icon > svg, div.email-cls-icon > svg, div.password-zone input[type='password']")
                .css ("pointer-events", "none");
            // Disables fields interactions.
            $ ("div.options > input[type='button']")
                .css ("cursor", "wait").css ("box-shadow", "none").css ("background-color", "#ccc")
                .val ("Vérification").attr ("title", "Vérification des données en cours...");
                this.checking = true;
            // Checking the passed entry process.
            this.process_id = window.setInterval (() => option.value = option.value.length < 15 ? (option.value + '.') : "Vérification", 1000);
        // Otherwise.
        } else if (this.process_id !== null && this.process_id !== undefined) {
            // Enables submit button.
            $ ("div.options > input[type='button']")
                .css ("cursor", "pointer").css ("box-shadow", "0 2px 3px gray").css ("background-color", "#075e54")
                .val ("Connexion").attr ("title", "Se connecter maintenant ?");           
            // Enables fields interactions.
            $ ("div.email-zone input[type='email'], div.pass-cls-icon > svg, div.email-cls-icon > svg, div.password-zone input[type='password']")
                .css ("pointer-events", "auto");
            // Destroys the current running process.
            window.clearInterval (this.process_id);
            this.checking = false;
        }
    }

    // Called when the component is ready for any using.
    componentDidMount = () => {
        // Fixing click event to password clearner icon.
        $ ("div.pass-cls-icon > svg").on ("click", () => $ ("input[type='password']").val (''));
        // Fixing click event to username or email clearner icon.
        $ ("div.email-cls-icon > svg").on ("click", () => $ ("input[type='email']").val (''));
        // Changes icon appearance.
        window.setInterval (() => {
            // Is it a guest in the previous event ?
            if (this.is_guest) {
                $ ("svg#email").css ("opacity", 1);
                $ ("svg#guest").css ("opacity", 0); 
                this.is_guest = false;
            // Otherwise.
            } else {
                $ ("svg#email").css ("opacity", 0);
                $ ("svg#guest").css ("opacity", 1);
                this.is_guest = true;
            }
        }, 10000);
    }

    // Gives page render from jsx language.
    render = () => <div className = "payment-login">
        <div className = "app-login fixed">
            <div className = "title" align = "center"><label>Identification</label></div><br/>
            <div className = "email-zone field-zone" onFocus = {this._show_clear_icon} onBlur = {this._hide_clear_icon}>
                <div className = "email-icon-zone icon-field">
                    <svg height = "30px" viewBox = "0 0 512 512" width = "27px" fill = "gray" id = "email">
                        <g><polygon points = {`448,384 448,141.8 316.9,241.6 385,319 383,321 304.1,251.4 256,288 
                        207.9,251.4 129,321 127,319 195,241.6 64,142 64,384`}/><polygon points = "439.7,128 72,128 256,267.9"/></g>
                    </svg>
                    <svg viewBox = "0 0 24 24" height = "30px" width = "27px" id = "guest">
                        <circle cx = "12" cy = '8' fill = "gray" r = '4'/>
                        <path d = "M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z" fill = "gray"/>
                    </svg>
                </div>
                <input type = "email" id = "email" placeholder = "Nom d'utilisateur" title = "Donnez votre pseudo." className = "field"
                    onFocus = {this._field_hightlight} onBlur = {this._field_unhightlight}/>
                <div className = "icon-clear email-cls-icon" title = "Nétoyer complètement la valeur saisie ?">
                    <svg height = "20px" viewBox = "0 0 512 512" width = "20px" fill = "silver">
                        <g><path d = {`M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,
                        133.3,379.7,33,256,33z M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,
                        2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8 l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,
                        0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76 l-75.9-75c-3.1-3.1-3.1-8.2,
                        0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7 c1.5-1.5,3.5-2.3,5.6-2.3c2.1,
                        0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z`}/></g>
                    </svg>
                </div>
            </div><br/>
            <div className = "password-zone field-zone" onFocus = {this._show_clear_icon} onBlur = {this._hide_clear_icon}>
                <div className = "pass-icon-zone icon-field">
                    <svg viewBox = "0 0 32 32" fill = "gray" width = "30px" height = "27px" id = "key">
                        <g><path d = {`M16,31a1,1,0,0,1-.6-.2l-4-3A1,1,0,0,1,11,27V17.47a9,9,0,1,1,10,0V19a1,1,0,0,1-.29.71L19.41,21l1.3,
                        1.29a1,1,0,0,1,0,1.42L19.41,25l1.3,1.29a1,1,0,0,1,.29.78,1,1,0,0,1-.4.73l-4,3A1,1,0,0,1,16,31Zm-3-4.5,3,
                        2.25,2.48-1.86-1.19-1.18a1,1,0,0,1,0-1.42L18.59,23l-1.3-1.29a1,1,0,0,1,0-1.42L19,18.59V16.92a1,1,0,0,1,.5-.86,
                        7,7,0,1,0-7,0,1,1,0,0,1,.5.86ZM20,19h0Z`}/><circle cx = "16" cy = '8' r = '1'/>
                        <path d = "M16,10a2,2,0,1,1,2-2A2,2,0,0,1,16,10Zm0-2Z"/></g>
                    </svg>
                </div>
                <input type = "password" id = "password" placeholder = "Mot de passe" title = "Donnez votre mot de passe."
                    className = "field" onFocus = {this._field_hightlight} onBlur = {this._field_unhightlight}/>
                <div className = "icon-clear pass-cls-icon" title = "Nétoyer complètement la valeur saisie ?">
                    <svg height = "20px" viewBox = "0 0 512 512" width = "20px" fill = "silver">
                        <g><path d = {`M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,
                        379.7,33,256,33z M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,
                        2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8 l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,
                        0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76 l-75.9-75c-3.1-3.1-3.1-8.2,
                        0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7 c1.5-1.5,3.5-2.3,5.6-2.3c2.1,
                        0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z`}/></g>
                    </svg>
                </div><br/><br/>
            </div><div className = "options" align = "center">
                <input type = "button" value = "Connexion" title = "Se connecter maintenant ?" onMouseEnter = {this._submit_button_hover_on}
                    onMouseOut = {this._submit_button_hover_off} onClick = {this._submit_button_click}/>
            </div>
        </div>
    </div>;
}
