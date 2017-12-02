import * as React from 'react';
import { post } from '../Api';
import { IStudentView, IdRequest } from '../models/ClientModel';


interface Props {
    refreshTableCB: () => void;
    closeModal: () => void;
    isVisible:boolean;
    student?:IStudentView;
};

interface State extends IStudentView{ };

const DeleteClientEnrollment = (newItem:IStudentView) => post<Number>('/enrollment/deleteenrollment', newItem);
const DeleteClientStudent = (s:IStudentView) => post<Number>('/student/delete', s);

export class DeleteStudentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);    
        

        if(this.props.student){
            this.state = {
                ...(this.props.student)
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
        const studentid = this.props.student ? this.props.student.id : undefined;

        if(this.props.student){
            let newItem = {
                ...this.props.student
            }
            DeleteClientEnrollment(newItem).then((affectRows) => {
                DeleteClientStudent(newItem).then((affectRows) => {
                    this.props.refreshTableCB();
                    this.toggleVisibility();
                });
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
                            <h1>Delete Student</h1>
                            <h3>{this.props.student ? `Deleting: ${this.props.student.firstname} ${this.props.student.lastname}` : ""}</h3>
                        </div>
                        <div className="modal-body">
                            <h4>Delete student and associated enrollments?</h4>
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
