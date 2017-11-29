import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from './NavBarContainer';
import { ClassTable } from './class/ClassTable';



export class IndexContainer extends React.Component<{},{}> {
    render():JSX.Element{
        return(
            <div id="root-content">
                <NavBarContainer />

                <div id="root-header">
                    <h1>University Classes</h1>
                </div>
                <div id="root-body">
                    <ClassTable />
                </div>
            </div>
        ); 
    }
}

ReactDOM.render(
    <IndexContainer />,
    document.getElementById("root")
);