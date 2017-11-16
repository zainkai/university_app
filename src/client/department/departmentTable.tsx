import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavBarContainer } from '../NavBarContainer';
import { post } from '../Api';
import { IDepartment } from '../models/dbModel';

interface Props {};
interface State {
    newestItems: IDepartment[];
    filteredItems: IDepartment[];
};


export class DepartmentTable extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);

        //update props
         this.updateNewestItems();
    }

    getDepartmentsClient = ():Promise<IDepartment[]> => post('/departments')

    updateNewestItems(){
        this.getDepartmentsClient().then(data => {
            this.setState({
                newestItems:data
            });

            this.filterItems();
        });
    }

    filterItems(){
        let currentItems = this.state.newestItems;

        //apply filters

        this.setState({
            filteredItems: currentItems
        });
    }

    renderTableHeader(){
        return(
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>Description</th>
                </tr>
            </thead>
        );
    }

    renderTableBody(){
        const tags = this.state.filteredItems.map(fi => {
            return(
                <tr>
                    <td>fi.id</td>
                    <td>fi.name</td>
                    <td>fi.description</td>
                </tr>
            );
        });

        return(
            <tbody>
                {tags}
            </tbody>
        );
    }

    render() {
        return(
        <div>
            <table>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </table>
        </div>
        );
    }
}