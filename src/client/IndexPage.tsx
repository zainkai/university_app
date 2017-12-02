import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from './NavBarContainer';



export class IndexContainer extends React.Component<{},{}> {
    render():JSX.Element{
        return(
            <div id="root-content">
                <NavBarContainer />
                <div id="root-header">
                    <h1> University App </h1>
                    <h3> Author: Kevin Turkington </h3>
                </div>
                <div id="root-body">
                    <h4>Project repo: <a href="https://github.com/zainkai/university_app">https://github.com/zainkai/university_app</a></h4>
                    <p>
                        CS340 final project
                    </p>
                </div>
            </div>
        ); 
    }
}

ReactDOM.render(
    <IndexContainer />,
    document.getElementById("root")
);