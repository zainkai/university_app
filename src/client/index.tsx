import * as React from 'react';
import * as ReactDOM from 'react-dom';



export interface Props {stuff:string};
export class IndexContainer extends React.Component<Props,{}> {
    constructor(props:Props){
        super(props);
    }
    

    render():JSX.Element{
        return(<h1> working React thingy </h1>); 
    }
}

ReactDOM.render(
    <IndexContainer stuff={"asdasd"}/>,
    document.getElementById("root")
);