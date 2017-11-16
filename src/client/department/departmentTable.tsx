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

const getClient = ():Promise<IDepartment[]> => post<IDepartment[]>('/department');

export class DepartmentTable extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);

        //update props
         this.updateNewestItems();
    }

    

    

    updateNewestItems(){

        getClient().then(data => {
            console.log(data);
            this.setState({
                newestItems:data,
                filteredItems: data
            });

            //this.filterItems();
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
        let tags:JSX.Element[] = [];

        if(this.state){ // there was loading errors without this
            tags = this.state.filteredItems.map(fi => {
                return(
                    <tr key={fi.id}>
                        <td>{fi.id}</td>
                        <td>{fi.name}</td>
                        <td>{fi.description}</td>
                    </tr>
                );
            });
        }

        return(
            <tbody>
                {tags}
            </tbody>
        );
    }

    render() {
        return(
        <div>
            <button onClick={this.updateNewestItems.bind(this)}>Refresh</button>
            <table>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </table>
        </div>
        );
    }
}