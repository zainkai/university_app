import * as React from 'react';
import { post } from '../Api';
import { IStudentView } from '../models/ClientModel';
import { AddStudentModal } from './AddStudentModal';
import { UpdateStudentModal } from './UpdateStudentModal'


interface Props {};
interface State {
    newestItems: IStudentView[];
    filteredItems: IStudentView[];

    student?:IStudentView;
    isVisibleUpdateModal:boolean;
};

const getClient = () => post<IStudentView[]>('/student');

export class StudentTable extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);

        this.state = {
            isVisibleUpdateModal: false,
            newestItems:[],
            filteredItems:[]
        };

        //update props
         this.updateNewestItems();
    }

    updateNewestItems(){
        getClient().then(data => {
            console.log(data);
            this.setState({
                newestItems:data,
                filteredItems: data,
                isVisibleUpdateModal:false
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

    updateStudentId(e:React.MouseEvent<HTMLButtonElement>){
        const id = Number(e.currentTarget.value);
        const updateStudent = this.state.newestItems.find(s => s.id === id);

        this.setState({student: updateStudent, isVisibleUpdateModal:true});
    }

    closeUpdateModalVis(){
        this.setState({
            isVisibleUpdateModal:false, student:undefined
        });
    }

    renderTableHeader(){
        return(
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th># Classes Enrolled</th>
                    <th>{/*update*/}</th>
                    <th>{/*delete*/}</th>
                </tr>
            </thead>
        );
    }

    renderTableBody(){
        let tags:JSX.Element[] = [];

        if(this.state.filteredItems){ // there was loading errors without this
            tags = this.state.filteredItems.map(fi => {
                const name = fi.firstname + ' ' + fi.lastname;
                return(
                    <tr key={fi.id}>
                        <td>{fi.id}</td>
                        <td>{name.replace(/_/g," ")}</td>
                        <td>{fi.classCount}</td>
                        <td>
                            <button value={fi.id} onClick={this.updateStudentId.bind(this)}>update</button>
                        </td>
                        <td>
                            <button>delete</button>
                        </td>
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
                    <UpdateStudentModal 
                        refreshTableCB={this.updateNewestItems.bind(this)}
                        isVisible={this.state.isVisibleUpdateModal}
                        closeModal={this.closeUpdateModalVis.bind(this)}
                        student={this.state.student}
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