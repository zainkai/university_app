import * as React from "react";

export class NavBarContainer extends React.Component<{},{}>{
    render (){
        return(
        <nav>
            <div className="navImage">
                <a href="/">
                    <img src="./favicon.ico"/>
                </a>
            </div>
            <div className="navLinks">
                <a href="/department">Departments</a>
                <a href="/building">Buildings</a>
                <a href="#">Link 3</a>
            </div>
        </nav>
        );
    }
}