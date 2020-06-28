import React from 'react'
import './Loader.css'
import {Row, Col } from 'react-bootstrap'

export default function Loader(){
	return(
		<Row className="justify-content-center mx-auto mt-5">
			<Col sm={6} lg={6} md={6}>
				<div className="Loader">
					<div class="loadingio-spinner-dual-ring-oj24885vggh"><div class="ldio-9si48d024dq">
					<div></div><div><div></div></div>
					</div></div>
				</div>
				<div className="LoaderText">
				</div>
			</Col>
		</Row>
	)
}