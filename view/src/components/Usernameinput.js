import React, {useState}from 'react'
import {InputGroup, FormControl,Row} from 'react-bootstrap'

export default function Usernameinput(props){

	const[ value, setValue] = useState('')

	const styles = {
		inputGroupText:{
			borderRadius:'50rem 0rem 0rem 50rem'
		},
		input:{
			borderRadius:'0rem 50rem 50rem 0rem'
		}
	}

	return(

		<Row>
			<InputGroup className="mb-3" >
	    		<InputGroup.Prepend>
	      			<InputGroup.Text id="inputGroup-sizing-sm" style={styles.inputGroupText}>@</InputGroup.Text>
	   			</InputGroup.Prepend>
		    	<FormControl
		    	style={styles.input}
		      	placeholder="Username"
		      	aria-label="Username"
		      	aria-describedby="basic-addon1"
		      	value={props.value}
		      	//onChange={(e)=>setValue(e.target.value)}
		      	onChange={(e)=>{props.getInputValue(e.target.value)}}
		    	/>
	  		</InputGroup>
		</Row>

	)
	
} 