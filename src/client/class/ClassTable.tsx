import * as React from 'react';
import { post } from '../Api';
import { IClassView } from '../models/ClientModel';
// import { AddDepartmentModal } from './AddDepartmentModal';


interface Props {};
interface State {
    newestItems: IClassView[];
    filteredItems: IClassView[];
};

const getClient = () => post<IClassView[]>('/class');

export class ClassTable extends React.Component<Props,State> {
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
                    {/* <th>Start Time</th>
                    <th>End Time</th> */}
                    <th>Department Name</th>
                    <th>Building Name</th>
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
                        {/* <td>{fi.starttime}</td>
                        <td>{fi.endtime}</td> */}
                        <td>{fi.departmentName}</td>
                        <td>{fi.buildingName}</td>
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
                <div className="table-buttons">
                    <button onClick={this.updateNewestItems.bind(this)}>Refresh</button><br/>
                    {/* <AddDepartmentModal 
                        refreshTableCB={this.updateNewestItems.bind(this)}
                    /> */}
                </div>
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