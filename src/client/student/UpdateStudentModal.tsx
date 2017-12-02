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

const updateClient = (newItem:IStudentView) => post<Number>('/student/update', newItem);

export class UpdateStudentModal extends React.Component<Props,State>{
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

    updateStudent(){
        // TODO: make REGEX helper for null/whitespace/special characters
        const studentid = this.props.student ? this.props.student.id : undefined;

        let newItem = {
            ...this.state,
            id: studentid
        }
        updateClient(newItem).then((id)=> {
            this.props.refreshTableCB();
            this.toggleVisibility();
        });
    }

    onChangeHandler(e:React.FormEvent<HTMLInputElement>){
        this.setState({[e.currentTarget.name]: e.currentTarget.value} as any);
    }

    render(){
        if (this.state){

            return(
                <div className="modal-container">
                    {/* <button className="modal-button" onClick={this.toggleVisibility.bind(this)}>Update</button> */}
                    <div className={"modal " + (this.props.isVisible ? "modal-show" : "modal-hidden")}>
                        <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                        <div className="modal-header">
                            <h1>Update Student</h1>
                            <h3>{this.props.student ? `editing: ${this.props.student.firstname} ${this.props.student.lastname}` : ""}</h3>
                        </div>
                        <div className="modal-body">
                            <label>First Name:</label> <input name='firstname' placeholder={this.props.student ? this.props.student.firstname : ""} onChange={this.onChangeHandler.bind(this)} type="text"/>
                            <label>Last Name:</label> <input name='lastname' placeholder={this.props.student ? this.props.student.lastname : ""} onChange={this.onChangeHandler.bind(this)} type="text"/>
                            <button onClick={this.updateStudent.bind(this)}>Add Item</button>
                        </div>
                    </div>
                </div>
            );
        }
        
        return(<div>loading...</div>);
    }
}
