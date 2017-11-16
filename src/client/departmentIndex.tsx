import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from './NavBarContainer';
import { DepartmentTable } from './department/departmentTable';



export class IndexContainer extends React.Component<{},{}> {
    render():JSX.Element{
        return(
            <div id="root-content">
                <NavBarContainer />

                <div id="root-header">
                    <h1>University Departments</h1>
                </div>
                <div id="root-body">
                    <DepartmentTable />
                </div>
            </div>
        ); 
    }
}

ReactDOM.render(
    <IndexContainer />,
    document.getElementById("root")
);