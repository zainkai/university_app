import * as React from 'react';
import { post } from '../Api';
import { IDepartment } from '../models/dbModel';


interface Props {
    refreshTableCB: () => void;
};

interface State extends IDepartment{
    isVisible:boolean;
};

const addClient = (newItem:IDepartment) => post<Number>('/department/add', newItem);

export class AddDepartmentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.state = {
            isVisible:false,
            name:""
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


    //webpack:https://github.com/Mercateo/react-with-typescript/blob/master/webpack.config.js
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
                        <h1>Add Department</h1>
                    </div>
                    <div className="modal-body">
                        <label>Name:</label> <input name='name' onChange={this.onChangeHandler.bind(this)} type="text"/>
                        <label>Description:</label> <textarea name='description' onChange={this.onChangeHandler.bind(this)}></textarea>
                        <button onClick={this.addNew.bind(this)}>Add Item</button>
                    </div>
                </div>
            </div>
        );
    }
}

