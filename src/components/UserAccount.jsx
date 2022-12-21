// Dependencies.
import BasicsTools from "../vendors/basics_tools.js";
import React, {PureComponent} from "react";
import "../styles/user_account.css";
import $ from "jquery";

// User account class definition.
export default class UserAccount extends PureComponent {
    // Constructor definition.
    constructor (props) {
        // Gets the parent constructor.
        super (props);
        // Initializes component state and attributes.
        this.user_account_data = {
            name: "user-account-page",
            title: "Mon compte"
        };
        this.state =  {
            total_amount: 75000,
            total_count: 1400
        }
        this.is_locked = false;
    }

    // Submit button hover off.
    _submit_button_hover_off = event => {
        // A request has it been launched ?
        if (!this.is_locked) $ (event.target).css ("box-shadow", "0 2px 3px gray").css ("background-color", "#075e54");
    }

    // Submit button hover on.
    _submit_button_hover_on = event => {
        // A request has it been launched ?
        if (!this.is_locked) $ (event.target).css ("box-shadow", "0 0 5px grey").css ("background-color", "#06453d");
    }

    // Called when the component is destroyed from the app view.
    componentWillUnmount = () => {
        // Calls page destroyed event.
        if (typeof this.props.destroyed === "function") this.props.destroyed (this.user_account_data);
    }

    // Called when the component is loaded and ready to use.
    componentDidMount = () => {
        // Calls page ready event.
        if (typeof this.props.ready === "function") this.props.ready (this.user_account_data);
    }

    // Starts get money process operation.
    _get_money = () => {
        // The claim button is it enabled ?
        if (!this.is_locked) {
            // Disables button usage.
            this.money_activation (false);
            // Money activation.
            window.setTimeout (() => this.money_activation (true), 5000);
        }
    }

    // Enables/Disables get money button.
    money_activation = activation => {
        // Enables button.
        if (activation) {
            $ ("div.claim-btn > button").css ("box-shadow", "0 2px 3px gray").css ("background-color", "#06453d").css ("cursor", "pointer");
            this.is_locked = false;
        // Otherwise.
        } else {
            $ ("div.claim-btn > button").css ("cursor", "not-allowed").css ("box-shadow", "none").css ("background-color", "#ccc");
            this.is_locked = true;
        }
    }

    // Gives page render from jsx language.
    render = () => <div className = "user-account">
        <div className = "user-profil-container" align = "center">
            <div className = "guest-img-zone">
                <div className = "user-img"><svg viewBox = "0 0 24 24" width = "160px" height = "160px" fill = "silver">
                    <g><path d = {`M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,4c2.2,
                    0,4,2.2,4,5s-1.8,5-4,5 s-4-2.2-4-5S9.8,4,12,4z M18.6,19.5C16.9,21,14.5,22,12,
                    22s-4.9-1-6.6-2.5c-0.4-0.4-0.5-1-0.1-1.4c1.1-1.3,2.6-2.2,4.2-2.7 c0.8,0.4,1.6,0.6,2.5,0.6s1.7-0.2,
                    2.5-0.6c1.7,0.5,3.1,1.4,4.2,2.7C19.1,18.5,19.1,19.1,18.6,19.5z`}/></g>
                </svg></div>
            </div><div className = "username-zone" align = "center"><label>User Name</label></div>
            <div className = "transactions-data">
                <div className = "tr-left-data">
                    <div className = "total-transactions"><label>{this.state.total_count}</label></div>
                    <div className = "transactions-image">
                        <svg width = "20px" height = "20px" viewBox = "0 0 512 512">
                            <g transform = "translate(0,512) scale(0.1,-0.1)" fill = "gray" stroke = "none">
                            <path d = {`M1008 4234 c-263 -261 -478 -478 -478 -482 0 -11 165 -172 176 -172 5 0 154 145 331 322 l323 323 
                            0 -1793 0 -1792 125 0 125 0 0 1792 0 1793 325 -325 325 -325 90 90 90 90 -478 477 -477 477 -477 -475z`}/>
                            <path d = {`M3510 2738 l0 -1793 -323 323 c-177 177 -327 322 -332 322 -6 0 -49 -38 -95 -85 l-85 -85 480 
                            -480 480 -480 480 480 480 480 -85 85 c-46 47 -89 85 -95 85 -5 0 -155 -145 -332 -322 l-323 -323 0 1793 
                            0 1792 -125 0 -125 0 0 -1792z`}/></g>
                        </svg>
                    </div>
                </div><div className = "tr-right-data"><label>{BasicsTools.parse_float (this.state.total_amount, 2)} XOF</label></div>
            </div><div className = "claim-btn"><button title = "Retirer les gains perçut par transaction." onMouseEnter = {this._submit_button_hover_on}
                onMouseOut = {this._submit_button_hover_off} onClick = {this._get_money}>Retrait</button></div>
        </div>
    </div>;
}
