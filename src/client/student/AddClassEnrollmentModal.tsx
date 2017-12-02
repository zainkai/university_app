import * as React from 'react';
import { post } from '../Api';
import { IStudentView, IdRequest, IClassView, IClassEnrollmentView } from '../models/ClientModel';
import {IClassEnrollment} from '../models/dbModel';


interface Props {
    refreshTableCB: () => void;
    closeModal: () => void;
    isVisible:boolean;
    student?:IStudentView;
};

interface State extends IClassEnrollment{
    avaliableOptions:IClassView[];
 };

const updateClient = (newItem:IClassEnrollment) => post<Number>('/enrollment/add', newItem);
const optionsClient = () => post<IClassView[]>('/class/options');

export class AddClassEnrollmentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);    
        
        this.updateOptions();

        if(this.props.student){
            const sid = this.props.student.id || 0;

            this.state = {
                studentid:sid,
                classid:0,
                avaliableOptions:[]
            }
        }
        this.state = {
            ...(this.state)
        }
    }

    updateOptions(){
        optionsClient().then(data => {
            this.setState({
                avaliableOptions:data
            })
        })
    }

    toggleVisibility(){
        this.props.closeModal();
    }

    updateStudent(){
        // TODO: make REGEX helper for null/whitespace/special characters
        const sid = this.props.student ? (this.props.student.id ? this.props.student.id: 0): 0;
        const cid = this.state.classid;

        let newItem = {
            classid:cid,
            studentid:sid
        }

        console.log(newItem);
        updateClient(newItem).then((id)=> {
            this.props.refreshTableCB();
            this.toggleVisibility();
        });
    }

    dropDownHandler(e:React.FormEvent<HTMLSelectElement>){
        //number conversions will have to be done on the backend because of jquery json conversions.
        this.setState({[e.currentTarget.name]: +(e.currentTarget.value)} as any);
    }

    renderOptionDropDown(){
        let tags:JSX.Element[] = [<option key='0' value='0'>N/A</option>];
        let currentClassId:number[] = [];
        if(this.state.avaliableOptions){

            const newTags = this.state.avaliableOptions.map(op => {
                return(
                    <option key={op.id} value={op.id}>{op.name}</option>
                );
            })

            tags = tags.concat(newTags);
        }

        return(
            <select name='classid' onChange={this.dropDownHandler.bind(this)}>{tags}</select>
        );
    }

    render(){
        if (this.state){

            return(
                <div className="modal-container">
                    {/* <button className="modal-button" onClick={this.toggleVisibility.bind(this)}>Update</button> */}
                    <div className={"modal " + (this.props.isVisible ? "modal-show" : "modal-hidden")}>
                        <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                        <div className="modal-header">
                            <h1>Enroll into a class</h1>
                            <h3>{this.props.student ? `editing: ${this.props.student.firstname} ${this.props.student.lastname}` : ""}</h3>
                            <h3>Note: Deleting enrollments<br/>can only occur on the enrollment page.</h3>
                        </div>
                        <div className="modal-body">
                            {this.renderOptionDropDown()}
                            <button onClick={this.updateStudent.bind(this)}>Add Item</button>
                        </div>
                    </div>
                </div>
            );
        }
        
        return(<div>loading...</div>);
    }
}
