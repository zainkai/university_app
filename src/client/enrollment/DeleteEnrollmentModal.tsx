import * as React from 'react';
import { post } from '../Api';
import { IStudentView, IdRequest, IClassEnrollmentView } from '../models/ClientModel';
import { IClassEnrollment } from '../models/dbModel';


interface Props {
    refreshTableCB: () => void;
    closeModal: () => void;
    isVisible:boolean;
    item?:IClassEnrollmentView;
};

interface State extends IClassEnrollment{ };

const DeleteClientEnrollment = (item:IClassEnrollment) => post<Number>('/enrollment/delete', item).catch(err => alert(err));

export class DeleteEnrollmentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);    
        

        if(this.props.item){
            this.state = {
                classid:this.props.item.classid,
                studentid:this.props.item.studentid
            }
        }
        this.state = {
            ...(this.state)
        }
    }

    toggleVisibility(){
        this.props.closeModal();
    }

    DeleteStudent(){
        // TODO: make REGEX helper for null/whitespace/special characters
        const studentid = this.props.item ? this.props.item.id : undefined;

        if(this.props.item){
            let newItem = {
                ...this.props.item
            }
            DeleteClientEnrollment(newItem).then((affectRows) => {
                    this.props.refreshTableCB();
                    this.toggleVisibility();
            });
        }
    }

    render(){
        if (this.state){

            return(
                <div className="modal-container">
                    {/* <button className="modal-button" onClick={this.toggleVisibility.bind(this)}>Update</button> */}
                    <div className={"modal " + (this.props.isVisible ? "modal-show" : "modal-hidden")}>
                        <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                        <div className="modal-header">
                            <h1>Delete Enrollment</h1>
                            <h3>{this.props.item ? `Deleting: ${this.props.item.studentFirstName} ${this.props.item.studentLastName} from ${this.props.item.className}` : ""}</h3>
                        </div>
                        <div className="modal-body">
                            <h4>Are you sure??</h4>
                            <span>
                                <button onClick={this.DeleteStudent.bind(this)}>Yes</button>
                                <button onClick={this.toggleVisibility.bind(this)}>No</button>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        
        return(<div>loading...</div>);
    }
}
