import * as React from "react";

export class NavBarContainer extends React.Component<{},{}>{
    render (){
        return(
        <nav>
            <div className="navImage">
                <img src="./favicon.ico"/>
            </div>
            <div className="navLinks">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </nav>
        );
    }
}