import * as React from 'react';
import { post } from '../Api';
import { IClassView, DepartmentOptions, BuildingOptions } from '../models/ClientModel';


interface Props {
    refreshTableCB: () => void;
};

interface State extends IClassView{
    isVisible:boolean;

    avaliableOptionsDept:DepartmentOptions[];
    avaliableOptionsBuil:DepartmentOptions[];
};

const addClient = (newItem:IClassView) => post<Number>('/class/add', newItem);
const optionsClientDepartments = () => post<DepartmentOptions[]>('/department/options');
const optionsClientBuildings = () => post<BuildingOptions[]>('/building/options');

export class AddClassModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.updateOptions();

        this.state = {
            ...this.state,
            isVisible:false,
            name:"",
            departmentid:0,
            buildingid:0
        };
    }

    updateOptions(){
        optionsClientDepartments().then(data => {
            this.setState({
                avaliableOptionsDept:data
            })
        });
        optionsClientBuildings().then(data => {
            this.setState({
                avaliableOptionsBuil:data
            })
        });
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

    renderOptionDropDownDept(){
        let tags:JSX.Element[] = [<option key='0' value='0'>N/A</option>];
        if(this.state.avaliableOptionsDept){
            const newTags = this.state.avaliableOptionsDept.map(op => {
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

    renderOptionDropDownBuilding(){
        let tags:JSX.Element[] = [<option key='0' value='0'>N/A</option>];
        if(this.state.avaliableOptionsBuil){
            const newTags = this.state.avaliableOptionsBuil.map(op => {
                return(
                    <option key={op.id} value={op.id}>{op.name}</option>
                );
            })

            tags = tags.concat(newTags);
        }

        return(
            <select name='buildingid' onChange={this.dropDownHandler.bind(this)}>{tags}</select>
        );
    }

    render(){
        return(
            <div className="modal-container">
                <button className="modal-button" onClick={this.toggleVisibility.bind(this)}>Add</button>
                <div className={"modal " + (this.state.isVisible ? "modal-show" : "modal-hidden")}>
                    <button onClick={this.toggleVisibility.bind(this)}>Close</button>
                    <div className="modal-header">
                        <h1>Add Class</h1>
                    </div>
                    <div className="modal-body">
                        <label>Name:</label> <input name='name' onChange={this.onChangeHandler.bind(this)} type="text"/>
                        <label>Associated Department</label>{this.renderOptionDropDownDept()}
                        <label>Associated Building</label>{this.renderOptionDropDownBuilding()}
                        <button onClick={this.addNew.bind(this)}>Add Item</button>
                    </div>
                </div>
            </div>
        );
    }
}

