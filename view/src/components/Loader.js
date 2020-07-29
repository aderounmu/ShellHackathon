import React from 'react'
import './Loader.css'
import {Row, Col } from 'react-bootstrap'

export default function Loader(){
	return(
		<Row className="justify-content-center mx-auto mt-5">
			<Col sm={7} lg={9} md={9}>
				<div className="Loader mx-auto w-25">
					<div class="loadingio-spinner-dual-ring-oj24885vggh"><div class="ldio-9si48d024dq">
					<div></div><div><div></div></div>
					</div></div>
				</div>
				<div className="LoaderText">
						<div className="h6 text-center">Please give us a moment while we get things ready</div>
						<div className="text-center">This might take some few minutes</div>
				</div>
			</Col>
		</Row>
	)
}