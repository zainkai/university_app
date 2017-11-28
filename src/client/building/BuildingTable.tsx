import * as React from 'react';
import { post } from '../Api';
import { IBuildingsView } from '../models/ClientModel';
//import { AddBuildingModal } from './AddBuildingModal';


interface Props {};
interface State {
    newestItems: IBuildingsView[];
    filteredItems: IBuildingsView[];
};

const getClient = () => post<IBuildingsView[]>('/building');

export class BuildingTable extends React.Component<Props,State> {
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
        });
    }

    filterItems(event:React.FormEvent<HTMLInputElement>){
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
                    <th>Department Name</th>
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
                        <td>{fi.departmentName}</td>
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
                {/* <div className="table-buttons">
                    <button onClick={this.updateNewestItems.bind(this)}>Refresh</button><br/>
                    <AddDepartmentModal 
                        refreshTableCB={this.updateNewestItems.bind(this)}
                    />
                </div> */}
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