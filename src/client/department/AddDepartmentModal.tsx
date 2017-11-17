import * as React from 'react';
import { post } from '../Api';
import { IDepartment } from '../models/dbModel';


interface Props {
    refreshTableCB: () => void;
    closeModalCB: ()=> void;
    isVisible:boolean;
};

interface State {
    newItem?: IDepartment;
};

const addClient = (newItem:IDepartment) => post<Number>('/department/add', newItem);

export class AddDepartmentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
    }

    toggleVisibility(){
        this.props.closeModalCB();
    }

    addNew(){

    }

    render(){
        return(
            <div className={"modal" + (this.props.isVisible ? " modal-show": " modal-hidden")}>
                <div className="modal-header">
                    <h1>Add Department</h1>
                    <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                </div>
                <div className="modal-body">
                    <span>Name: <input type="text"/></span>
                    <span>Description: <textarea></textarea></span>
                    <button onClick={this.addNew.bind(this)}>Add Item</button>
                </div>
            </div>
        );
    }
}

