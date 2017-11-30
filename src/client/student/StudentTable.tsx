import * as React from 'react';
import { post } from '../Api';
import { IStudentView } from '../models/ClientModel';
import { AddStudentModal } from './AddStudentModal';


interface Props {};
interface State {
    newestItems: IStudentView[];
    filteredItems: IStudentView[];
};

const getClient = () => post<IStudentView[]>('/student');

export class StudentTable extends React.Component<Props,State> {
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
        const newFilteredItems = this.state.newestItems.filter(i => {
            const name = i.firstname + ' ' + i.lastname;

            return name.replace(/_/g," ").toLowerCase()
                .indexOf(searchName.toLowerCase()) > -1;
        });

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
                    <th># Classes Enrolled</th>
                </tr>
            </thead>
        );
    }

    renderTableBody(){
        let tags:JSX.Element[] = [];

        if(this.state){ // there was loading errors without this
            tags = this.state.filteredItems.map(fi => {
                const name = fi.firstname + ' ' + fi.lastname;
                return(
                    <tr key={fi.id}>
                        <td>{fi.id}</td>
                        <td>{name.replace(/_/g," ")}</td>
                        <td>{fi.classCount}</td>
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
                    <AddStudentModal 
                        refreshTableCB={this.updateNewestItems.bind(this)}
                    />
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