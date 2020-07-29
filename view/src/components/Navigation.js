import React from 'react'
import {Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigation(props){

	const styles = {
	    icon:{color: '#2196f3'}
	}

	return (
		<Navbar bg="light" variant="light" className="myNav py-md-3 shadow-sm">
			  <Link to="/" className="h3 text-decoration-none mx-auto text-center font-weight-light" style={styles.icon}>Depression Checker</Link>
		</Navbar>
	)
	
}