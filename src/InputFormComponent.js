import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class InputFormComponent extends Component {

	state = {vastValue:""};
	constructor(props) {
        //console.log(props.onClick);
        super(props);
        this.onClick = props.onClick;
        this.state = {
            dataPoints: this.props.dataPoints || [],
            url: this.props.url || ""
        }
    }

	/*const onClick = (event) => {
    	console.log("SUBMIT BUTTON PRESSED", this.inputNode.vastVal);
    	return;
  	}*/	
  /*componentDidMount() {
  	//this.props
  }*/

  render() {
  	return (
	    <Form>
	        <Form.Label><h2>VAST URL</h2></Form.Label>
	        <Form.Control 
	        	type="text" 
	        	onChange={e => this.setState({ vastValue: e.target.value })}
	        	placeholder="VAST URL" /><br/>
	        <Button onClick={()=>this.onClick(this.state.vastValue)} variant="primary">Submit</Button>
	    </Form>
	  );
  }
}

export default InputFormComponent;