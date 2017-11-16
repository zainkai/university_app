import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from './NavBarContainer';



export class IndexContainer extends React.Component<{},{}> {
    render():JSX.Element{
        return(
            <div>
                <NavBarContainer />
                <h1> University App </h1>
                <h3> Author: Kevin Turkington </h3>
            </div>
        ); 
    }
}

ReactDOM.render(
    <IndexContainer />,
    document.getElementById("root")
);