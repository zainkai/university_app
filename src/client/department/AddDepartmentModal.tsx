import * as React from 'react';
import { post } from '../Api';
import { IDepartment } from '../models/dbModel';


interface Props {
    refreshTableCB: () => void;
    closeModalCB: ()=> void;
    isVisible:boolean;
};

interface State extends IDepartment{ };

const addClient = (newItem:IDepartment) => post<Number>('/department/add', newItem);

export class AddDepartmentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
    }

    toggleVisibility(){
        this.props.closeModalCB();
    }

    addNew(){
        // TODO: make REGEX helper for null/whitespace/special characters
    }


    //webpack:https://github.com/Mercateo/react-with-typescript/blob/master/webpack.config.js
    onChangeHandler(e:React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        this.setState({[e.currentTarget.name]: e.currentTarget.value} as any);
    }

    render(){
        return(
            <div className={"modal" + (this.props.isVisible ? " modal-show" : " modal-hidden")}>
                <div className="modal-header">
                    <h1>Add Department</h1>
                    <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                </div>
                <div className="modal-body">
                    <span>Name: <input name='name' onChange={this.onChangeHandler.bind(this)} type="text"/></span>
                    <span>Description: <textarea name='description' onChange={this.onChangeHandler.bind(this)}></textarea></span>
                    <button onClick={this.addNew.bind(this)}>Add Item</button>
                </div>
            </div>
        );
    }
}

