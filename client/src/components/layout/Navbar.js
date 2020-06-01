import React, { Fragment, Component } from "react";


class Navbar extends Component {
    render() {
        return (
            <div className="navbar bg-primary">
                <h4>Your Daily Task Tracker</h4>
                <ul>
                    <li>Login</li>
                    <li>Register</li>
                </ul>
            </div>
        )
    }
}

export default Navbar;