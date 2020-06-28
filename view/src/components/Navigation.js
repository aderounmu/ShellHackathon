import React from 'react'
import {Navbar} from 'react-bootstrap'

export default function Navigation(props){

	const styles = {
	    icon:{color: '#2196f3'}
	}

	return (
		<Navbar bg="light" variant="light" className="myNav py-md-3 shadow-sm">
			  <a href="#home" className="h3 text-decoration-none mx-auto text-center font-weight-light" style={styles.icon}>Depression Checker</a>
		</Navbar>
	)
	
}