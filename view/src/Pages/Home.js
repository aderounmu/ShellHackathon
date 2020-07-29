import React ,{ Component } from 'react'
import { Container , Col , Row , Form, Card , Modal } from 'react-bootstrap'

import Navigation from '../components/Navigation.js'
import Usernameinput from '../components/Usernameinput.js'
import Textinput from '../components/Textinput.js'
import background from '../components/Wave-10s-1528px.svg'
import Loader from '../components/Loader.js'



export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			isTweet: true,
			inputValue: '',
			Result: {},
			isResult: false,
			error: false,
			error_message: '',
			isFetching:false,
			isLoaded:false
		}

	}

	getInputValue = (value) => this.setState({inputValue: value})
	checkChange = (e) => this.setState({isTweet : !this.state.isTweet})

	getResult(){
		fetch(`/api/tweet/${this.state.inputValue}`,{method: 'GET',headers:{'Content-Type':'application/json'}})
		.then((response) => response.json())
		.then((data)=>{
          this.setState({Result:data.data})
      	})
      	.catch((error)=>{
        let error_message = 'Something Went wrong, Please Try Again'
          this.setState({isFetching: false})
          this.setState({error : true})
          this.setState({error_message})
          return Promise.reject()
     	})
     	.then(()=>{
			this.setState({isFetching:false})
			this.setState({isLoaded:true})
		})
	}

	onSubmit(e){
		e.preventDefault();
		if(this.state.isTweet){
			this.props.history.push(`/Dashboard/${this.state.inputValue}`)
		}else{

			let myPromise = new Promise(resolve=>{
				this.setState({isLoaded:false})
				this.setState({isFetching:true})
				resolve()

			}).then(()=>{
				this.getResult()			
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
		let { isTweet, inputValue ,Result,isFetching, isLoaded} = this.state
		let res = ""
		
		if(!isLoaded && !isFetching){
			res = ''
		}else if(isLoaded){
			res = <Card border="light mt-5">
				    <Card.Header> Result</Card.Header>
				    <Card.Body>
		 		      <Card.Title>{Result[0].text} </Card.Title>
				      <Card.Text>
				      This Text is  
				      <div style={{color:Result[0].value > 0.5 ? '#39a4fa' : '#f32151'}}>
				      { Result[0].value > 0.5 ? (Result[0].value * 100).toFixed(2) : ((1-Result[0].value)*100).toFixed(2)}
				      %  { Result[0].value > 0.5 ? 'Non depressive' : 'Depressive'}
				      </div> 
				      	
				      </Card.Text>
				    </Card.Body>
				</Card>
		}else if(isFetching){
			res = <Row className="pt-3"><Loader/></Row>
		}else{
			res = ''
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
    								<button className="btn btn-primary" type="submit">Check</button>
    							</Col>
    						</Row>
			 			</Form>
			 			</Col>
			 		</Row>
			 		<Row className="justify-content-center text-center">
			 			<div className="Result">
			 				{res}
			 			</div>
			 		</Row>
			</Container>
			<div className="fixed-bottom w-100 background-container">
				<img src={background} className="background position-absolute w-100"  alt="logo"/>
			</div>
		</div>
	
		)
	}
}