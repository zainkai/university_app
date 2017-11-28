import * as React from 'react';
import { post } from '../Api';
import { IBuildingsView, DepartmentOptions } from '../models/ClientModel';


interface Props {
    refreshTableCB: () => void;
};

interface State extends IBuildingsView{
    isVisible:boolean;

    avaliableOptions:DepartmentOptions[];
};

const addClient = (newItem:IBuildingsView) => post<Number>('/building/add', newItem);
const optionsClient = () => post<DepartmentOptions[]>('/department/options');

export class AddBuildingModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.updateOptions();

        this.state = {
            ...this.state,
            isVisible:false,
            name:"",
            departmentid:0,
        };
    }

    updateOptions(){
        optionsClient().then(data => {
            this.setState({
                avaliableOptions:data
            })
        })
    }

    toggleVisibility(){
        this.updateOptions();
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

    dropDownHandler(e:React.FormEvent<HTMLSelectElement>){
        //number conversions will have to be done on the backend because of jquery json conversions.
        this.setState({[e.currentTarget.name]: +(e.currentTarget.value)} as any);
    }

    renderOptionDropDown(){
        let tags:JSX.Element[] = [<option key='0' value='0'>N/A</option>];
        if(this.state.avaliableOptions){
            const newTags = this.state.avaliableOptions.map(op => {
                return(
                    <option key={op.id} value={op.id}>{op.name}</option>
                );
            })

            tags = tags.concat(newTags);
        }

        return(
            <select name='departmentid' onChange={this.dropDownHandler.bind(this)}>{tags}</select>
        );
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
                        <label>Name:</label> <input name='name' onChange={this.onChangeHandler.bind(this)} type="text"/>
                        <label>Description:</label> <textarea name='description' onChange={this.onChangeHandler.bind(this)}></textarea>
                        <label>Associated Department</label>{this.renderOptionDropDown()}
                        <button onClick={this.addNew.bind(this)}>Add Item</button>
                    </div>
                </div>
            </div>
        );
    }
}

