import React  from 'react'
import {Form,Row} from 'react-bootstrap'

export default function Textinput(props){
	return(
		<Row>
    		<Form.Control 
    		className="rounded-pill"
    		type="text" 
    		placeholder="Enter Text"
    		value={props.value} 
    		onChange={(e)=>{props.getInputValue(e.target.value)}} 
    		 />
    	</Row>
	)
}