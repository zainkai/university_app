import * as React from 'react';
import { post } from '../Api';
import { IDepartment } from '../models/dbModel';


interface Props {
    refreshTableCB: () => void;
};
interface State {
    newItem?: IDepartment;
    isVisible:boolean;
};

export class AddDepartmentModal extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.state =({
            isVisible:false
        });
    }

    
}

