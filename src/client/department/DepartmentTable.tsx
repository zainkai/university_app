import * as React from 'react';
import { post } from '../Api';
import { IDepartment } from '../models/dbModel';
import { AddDepartmentModal } from './AddDepartmentModal';


interface Props {};
interface State {
    newestItems: IDepartment[];
    filteredItems: IDepartment[];
};

const getClient = () => post<IDepartment[]>('/department');

export class DepartmentTable extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);

        //update props
         this.updateNewestItems();
    }

    updateNewestItems(){
        getClient().then(data => {
            //console.log(data);
            this.setState({
                newestItems:data,
                filteredItems: data
            });

            //this.filterItems();
        });
    }

    filterItems(event:React.FormEvent<HTMLInputElement>){
        //console.log(event.currentTarget.value)

        const searchName:string = event.currentTarget.value;
        const newFilteredItems = this.state.newestItems.filter(i => 
            i.name.replace(/_/g," ").toLowerCase()
            .indexOf(searchName.toLowerCase()) > -1);

        this.setState({
            filteredItems: newFilteredItems
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
                        <td>{fi.name.replace(/_/g," ")}</td>
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
        <div className="table-container">
            <div className="table-controls">
                <button onClick={this.updateNewestItems.bind(this)}>Refresh</button>
                <span>Search Name:<input type="text" onChange={this.filterItems.bind(this)} /></span>
            </div>
            <table>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </table>
        </div>
        );
    }
}