import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"

class NavBar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <div className="title">Hwody</div>
                <div className="menu-icon">

                </div>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        )
    }
}

export default NavBar;
