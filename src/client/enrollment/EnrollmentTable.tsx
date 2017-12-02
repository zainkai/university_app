import * as React from 'react';
import { post } from '../Api';
import { IClassEnrollmentView } from '../models/ClientModel';
// import { AddStudentModal } from './AddStudentModal';
// import { UpdateStudentModal } from './UpdateStudentModal';
// import { DeleteStudentModal } from './DeleteStudentModal';


interface Props {};
interface State {
    newestItems: IClassEnrollmentView[];
    filteredItems: IClassEnrollmentView[];

    item?:IClassEnrollmentView;
    isVisibleDeleteModal:boolean;
};

const getClient = () => post<IClassEnrollmentView[]>('/enrollment');

export class EnrollmentTable extends React.Component<Props,State> {
    constructor(props:Props){
        super(props);

        this.state = {
            isVisibleDeleteModal:false,
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
            });
        });
    }

    filterItems(event:React.FormEvent<HTMLInputElement>){
        const searchName:string = event.currentTarget.value;
        const newFilteredItems = this.state.newestItems.filter(i => {
            const name = i.studentFirstName + ' ' + i.studentLastName;

            return name.replace(/_/g," ").toLowerCase()
                .indexOf(searchName.toLowerCase()) > -1;
        });

        this.setState({
            filteredItems: newFilteredItems
        });
    }

    // deleteStudent(e:React.MouseEvent<HTMLButtonElement>){
    //     const id = Number(e.currentTarget.value);
    //     const updateStudent = this.state.newestItems.find(s => s.id === id);

    //     this.setState({item: updateStudent, isVisibleDeleteModal:true});
    // }

    // closeUpdateModalVis(){
    //     this.setState({
    //         isVisibleUpdateModal:false, student:undefined
    //     });
    // }


    renderTableHeader(){
        return(
            <thead>
                <tr>
                    <th>id</th>
                    <th>Student Name</th>
                    <th>Class Name</th>
                </tr>
            </thead>
        );
    }

    renderTableBody(){
        let tags:JSX.Element[] = [];

        if(this.state.filteredItems){ // there was loading errors without this
            tags = this.state.filteredItems.map(fi => {
                const name = fi.studentFirstName + ' ' + fi.studentLastName;
                return(
                    <tr key={fi.id}>
                        <td>{fi.id}</td>
                        <td>{name.replace(/_/g," ")}</td>
                        <td>{fi.className.replace(/_/g," ")}</td>
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
                    {/* <AddStudentModal 
                        refreshTableCB={this.updateNewestItems.bind(this)}
                    /> */}
                    {/* <DeleteStudentModal 
                        refreshTableCB={this.updateNewestItems.bind(this)}
                        isVisible={this.state.isVisibleDeleteModal}
                        closeModal={this.closeDeleteModalVis.bind(this)}
                        student={this.state.student}
                    /> */}
                </div>
                <span>Search Student Name:<input type="text" onChange={this.filterItems.bind(this)} /></span>
            </div>
            <table>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </table>
        </div>
        );
    }
}