import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from './NavBarContainer';
import { BuildingTable } from './building/BuildingTable';



export class IndexContainer extends React.Component<{},{}> {
    render():JSX.Element{
        return(
            <div id="root-content">
                <NavBarContainer />

                <div id="root-header">
                    <h1>University Buildings</h1>
                </div>
                <div id="root-body">
                    <BuildingTable />
                </div>
            </div>
        ); 
    }
}

ReactDOM.render(
    <IndexContainer />,
    document.getElementById("root")
);