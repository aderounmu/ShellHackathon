import React ,{ Component } from 'react'
import { Container , Col , Row , Form, Card , Modal } from 'react-bootstrap'

import Navigation from '../components/Navigation.js'
import Usernameinput from '../components/Usernameinput.js'
import Textinput from '../components/Textinput.js'




export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			isTweet: true,
			inputValue: '',
			Result: {},
			isResult: false,
			error: false,
			error_message: ''
		}

	}

	getInputValue = (value) => this.setState({inputValue: value})
	checkChange = (e) => this.setState({isTweet : !this.state.isTweet})

	onSubmit(e){
		e.preventDefault();
		if(this.state.isTweet){
			this.props.history.push(`/Dashboard/${this.state.inputValue}`)
		}else{

			fetch(`/api/tweet/${this.state.inputValue}`,{method: 'GET',headers:{'Content-Type':'application/json'}})
	      	.then((response) => response.json())
	      	.then((data)=>{
	          this.setState({Result:data.data})
	      	})

		}
	}

	handleModalClose = () => this.setState({error:false})

	componentDidMount(){

		if(!(this.props.location.state === undefined)){
			this.setState({error : this.props.location.state.isError })
			this.setState({error_message : this.props.location.state.error })
		}


	}

	render(){
		let { isTweet, inputValue ,Result} = this.state
		let res = ""
		
		if(Object.keys(Result).length <= 0){
			res = ''
		}else {
			res = <Card border="light">
				    <Card.Header> Result</Card.Header>
				    <Card.Body>
				      <Card.Title>Light Card Title</Card.Title>
				      <Card.Text>
				      {Result[0].text} : {Result[0].value}
				      </Card.Text>
				    </Card.Body>
				</Card>
		}
			 						
		return (
		<div className="main">
			{
				<Modal className="mt-5"
        		show={this.state.error}
        		onHide={this.handleModalClose}
        		backdrop="static"
        		keyboard={false}
      			>
        		<Modal.Header closeButton>
          			<Modal.Title>{this.state.error_message}</Modal.Title>
        		</Modal.Header>
        		<Modal.Body>
          			Sorry An Error Occured
        		</Modal.Body>
			    </Modal>
			}
			<Navigation className="w-100"/>
			<Container fluid>
			 		<Row className="justify-content-center text-center">
			 		  <Col sm={6}className="mx-auto my-5">

				 		<div className="h4">Welcome this is a simple application that utilizes twitter data to access and  analayze mental health of people</div>
				 		<div>Please input a valid twitter handle or a valid text to process</div>
				 		</Col>
			 		</Row>
			 		<Row className="justify-content-center text-center">
			 			<Col lg={5} md={6} sm={6} className="mx-5">
			 			<Form className="" onSubmit={this.onSubmit.bind(this)}>
			 				<Row className="">
				 				<Form.Group controlId="FormInput" className="w-100">
					 				{
					 					isTweet ? <Usernameinput getInputValue={this.getInputValue} value={inputValue}/> : <Textinput getInputValue={this.getInputValue} value={inputValue}/>
					 				}

					 			</Form.Group>
			 			 	</Row>
			 			 	<Row className="">
    							<Col>
    								<Form.Group controlId="formcontrolText">
    									<Form.Check 
    									type="checkbox"
    									checked={isTweet}
            							onChange={this.checkChange} 
    									label="Twitter"/>
    								</Form.Group>
    							</Col>
    							<Col>
    								<Form.Group controlId="formcontrolTweet">
    									<Form.Check 
    									checked={!isTweet}
            							onChange={this.checkChange}
    									type="checkbox" 
    									label="Text"/>
    								</Form.Group>
    							</Col>
    						</Row>
    						<Row>
    							<Col>
    								<button type="submit">Check</button>
    							</Col>
    						</Row>
			 			</Form>
			 			</Col>
			 		</Row>
			 		<Row className="justify-content-center text-center">
			 			<div className="Result">
			 				{
			 					res

			 				}
			 			</div>
			 		</Row>
			</Container>
		</div>
	
		)
	}
}