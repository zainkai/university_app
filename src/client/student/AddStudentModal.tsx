import * as React from 'react';
import { post } from '../Api';
import { IStudentView } from '../models/ClientModel';


interface Props {
    refreshTableCB: () => void;
};

interface State extends IStudentView{
    isVisible:boolean;

};

const addClient = (newItem:IStudentView) => post<Number>('/student/add', newItem);

export class AddStudentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
;

        this.state = {
            ...this.state,
            isVisible:false,
            firstname:"",
            lastname:"",
        };
    }

    toggleVisibility(){
        this.setState({isVisible:!this.state.isVisible});
    }

    addNew(){
        // TODO: make REGEX helper for null/whitespace/special characters
        let newItem = {...this.state}
        addClient(newItem).then((id)=> {
            this.props.refreshTableCB();
            this.toggleVisibility();
        });
    }

    onChangeHandler(e:React.FormEvent<HTMLInputElement>){
        this.setState({[e.currentTarget.name]: e.currentTarget.value} as any);
    }

    render(){
        return(
            <div className="modal-container">
                <button className="modal-button" onClick={this.toggleVisibility.bind(this)}>Add</button>
                <div className={"modal " + (this.state.isVisible ? "modal-show" : "modal-hidden")}>
                    <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                    <div className="modal-header">
                        <h1>Add Building</h1>
                    </div>
                    <div className="modal-body">
                        <label>First Name:</label> <input name='firstname' onChange={this.onChangeHandler.bind(this)} type="text"/>
                        <label>Last Name:</label> <input name='lastname' onChange={this.onChangeHandler.bind(this)} type="text"/>
                        <button onClick={this.addNew.bind(this)}>Add Item</button>
                    </div>
                </div>
            </div>
        );
    }
}

