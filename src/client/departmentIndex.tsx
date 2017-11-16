import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from './NavBarContainer';
import { DepartmentTable } from './department/departmentTable';



export class IndexContainer extends React.Component<{},{}> {
    render():JSX.Element{
        return(
            <div>
                <NavBarContainer />
                <DepartmentTable />
            </div>
        ); 
    }
}

ReactDOM.render(
    <IndexContainer />,
    document.getElementById("root")
);