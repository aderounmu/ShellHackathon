 import React , { Component } from 'react'
 import { Container , Col , Row , Card} from 'react-bootstrap'

import Navigation from '../components/Navigation.js'
import Loader from '../components/Loader.js'
import DashboardLayout from '../components/DashboardLayout.js'
//import originalData from '../fullsampledata.js'
//import originalData from '../sampledata2.js'
//import originalData from '../sampledata.js'



 

 export default class Dashboard extends Component{
 	constructor(props) {
	    super(props);
	    this.state = {
	      username: '',
	      data:[],
	      DataperYear:[],
	      allPositive:[],
	      allNegative:[],
	      filter: null,
	      filterData:[{}],
	      filterDataPerMonth:[],
	      filterNegative:[],
	      filterPositive:[],
	      forPieChart:[],
	      ListYears:[],
	      forLineChart:[],
        forWordCloud:[],
	      filterAverage:null,
	      Loaded: false,
        error:''
	    };
  	}

  	renderDashboard(){

  		let {filter,filterData , data} = this.state

  		return(
  			<DashboardLayout 
	  			rawData={ filter === null || filter === 'All Data'? data : filterData[0].data} 
	  			filtered ={ filter === null || filter === 'All Data'? false : true}
	  			username={this.state.username}
	  			NegativeCount={ filter === null || filter === 'All Data'? this.state.allNegative.length: this.state.filterNegative.length}
	  			PositiveCount={ filter === null || filter === 'All Data'? this.state.allPositive.length: this.state.filterPositive.length}
	  			PieData={this.state.forPieChart}
	  			LineData={this.state.forLineChart}
          WordCloud= {this.state.forWordCloud}
	  			filter={filter}
	  			setfilter={this.setfilter}
	  			Years={ this.state.ListYears}
          Average={this.state.filterAverage.toFixed(2)}
  			/>
  		)
  	}

  	//
  	/*Our Filtering event */
  	setfilter = (payload) => {

  		let payl = payload

  		if(payl !== 'All Data'){
  			 payl = Number(payl)
  		}else{
  			payl = 'All Data'
  		}

  		let res1 = new Promise ( (resolve) =>{this.setState({filter:payl}) ; resolve()})
  		.then(()=>{
  			this.filtering()
  		})
  		.then(()=>{
  			this.getDatePermonth() //remove if not needed later
  		})
  		.then(()=>{
  			this.filterPositiveandNegative()
  		})
  		.then(()=>{
  			this.generateDataForGraphs()
  		})
  	}
  


  	getDatePermonth(){
  		let filter = this.state.filter 
  		let create_index = 0;
  		let dataBymonth = []
        let months = []

  		if(!(filter === null || filter === 'All Data')){
  			
	  		this.state.filterData.forEach((element)=>{
		    	element.data.forEach((element)=>{
		    		let inputIndex = months.findIndex(item =>{
		    	 	let d2 = new Date(element.date).getMonth();
		    	 	if (item  === d2) return true 
		    	 	else return false
		    	 })
		                
		            if(inputIndex === -1 || dataBymonth.length === 0){
		                dataBymonth[create_index] = {
		                    date: new Date(element.date).getMonth(),
		                    data:[]
		                }
		                dataBymonth[create_index].data.push(element)
		                months[create_index] = new Date(element.date).getMonth()
		                create_index++
		            }else{
		                dataBymonth[inputIndex].data.push(element)
		            }
		    	})         
	        });
  		}
      dataBymonth.sort((a,b)=>a.date-b.date)
  		this.setState({filterDataPerMonth: dataBymonth})
  		return dataBymonth
  	}

  	getDataPerYear(){

  		let create_index = 0;
        let dataBydate = []
        let years = []
	
  		this.state.data.forEach((element)=>{
	    	 let inputIndex = years.findIndex(item =>{
	    	 	let d2 = new Date(element.date).getFullYear();
	    	 	if (item  === d2) return true 
	    	 	else return false
	    	 })
	                
	            if(inputIndex === -1 || dataBydate.length === 0){
	                dataBydate[create_index] = {
	                    date: new Date(element.date).getFullYear(),
	                    data:[]
	                }
	                dataBydate[create_index].data.push(element)
	                years[create_index] = new Date(element.date).getFullYear()
	                create_index++
	            }else{
	                dataBydate[inputIndex].data.push(element)
	            }
                    
        });

        this.setState({DataperYear: dataBydate})
        this.setState({ListYears: years})
  	}

  	setAverage(){
  		let filter = this.state.filter 
  		if(filter === null || filter === 'All Data'){
  			let Average = 0 
  			let total = 0
  			this.state.data.forEach((element)=>{
  				total += element.sentiment
  			})
  			Average = total/this.state.data.length
  			this.setState({filterAverage: Average})
  		}else{

  			let Average = 0
  			let total = 0
  			this.state.filterData.forEach((element)=>{
  				element.data.forEach((element)=>{
  					total += element.sentiment
  				})
  				Average = total/element.data.length
  				this.setState({filterAverage: Average})
  			})
  		}
  	}

  	filtering(){
  		let filter = this.state.filter 
  		if(filter === null || filter === 'All Data'){
  			this.setState({filterData : this.state.DataperYear})
  			console.log('filtering done')
  		}else{
  			let filterData =  this.state.DataperYear.filter((element) => element.date === filter)
  			this.setState({filterData})
  		}

  	}

 	/** DATA FOR THE GRAPHS ***/

 	getPositiveandNegativeData(){
 		let allPositive = this.state.data.filter((element)=>element.sentiment >= 0.4)
 		let allNegative = this.state.data.filter((element)=>element.sentiment < 0.4)
 		this.setState({allNegative})
 		this.setState({allPositive})
 	}

 	filterPositiveandNegative(){
 		let filter = this.state.filter 

 		if(!(filter === null || filter === 'All Data')){

	 		this.state.filterData.forEach((item) =>{
	 			let filterNegative = item.data.filter((element)=>element.sentiment < 0.4)
		 		let filterPositive = item.data.filter((element)=>element.sentiment >= 0.4)
		 		this.setState({filterPositive})
		 		this.setState({filterNegative})
	 		})
 		}
 		else{
 			//do nothing please
 		}
 	}

dataforWordCloud(){
  let filter = this.state.filter
  let clouddata = []
  if(filter === null || filter === 'All Data'){
    clouddata = this.state.data.slice(0,10)
  }else{
      clouddata = this.state.filterData[0].data
  }
  let cloudword = ''
  clouddata.forEach(element =>{
    cloudword = cloudword + element.text
  })

  let words = cloudword.split(/[\s.]+/g)
    .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
    .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
    .map(w => w.replace(/['’]s$/g, ""))
    .map(w => w.substring(0, 30))
    .map(w => w.toLowerCase())
    .map(w => w.trim())
    

    let data = []
    let create_index = 0
    words.forEach((element)=>{
        let inputIndex = data.findIndex((item) =>{ 
          if (element === item.text) return true 
          else return false 
        })
                    
        if(inputIndex === -1 || data.length === 0){
            data[create_index] = {
                text: element,
                value : 1
            }
            create_index++
        }else{
            data[inputIndex].value++
        }
    })
    

    this.setState({forWordCloud: data})
}

 	dataForPie(){
 		let filter = this.state.filter
 		if(filter === null || filter === 'All Data'){

 			let data = [
 				{name:'Positive', value: this.state.allPositive.length},
 				{name:'Negative', value: this.state.allNegative.length}
 			]
 			this.setState({forPieChart: data})
 		}else{
 			let data = [
 				{name:'Positive', value: this.state.filterPositive.length },
 				{name:'Negative', value: this.state.filterNegative.length}
 			]
 			this.setState({forPieChart: data})
 		}
 }

 	dataforLines(){
 		let filter = this.state.filter
 		
 		if(filter === null || filter === 'All Data'){
 			let data= [];
 			this.state.filterData.forEach((element)=>{

 				let Positive = element.data.filter((element)=>element.sentiment >= 0.4).length
 				let Negative = element.data.filter((element)=>element.sentiment < 0.4).length
 				let values = {
 					name: element.date,
 					Positive : Positive,
 					Negative : Negative
 				}
 				data.push(values)	
 			})

 			this.setState({forLineChart: data})

 		}else{

 			let data = []
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
 			this.state.filterDataPerMonth.forEach((element)=>{

 				let Positive = element.data.filter((element)=>element.sentiment >= 0.4).length
 				let Negative = element.data.filter((element)=>element.sentiment < 0.4).length
 				let values = {
 					name: months[element.date],
 					Positive : Positive,
 					Negative : Negative
 				}
 				data.push(values)	
 			})

 			this.setState({forLineChart: data})
 		}

 	}

 	generateDataForGraphs(){
 		this.dataForPie()
 		this.dataforLines()
 		this.setAverage()
    this.dataforWordCloud()
 	}

    fetchData(){

       return 
    }
    
  	LoadData(){
  		// let mypromise = new Promise(
  		// 	resolve =>{
  		// 		setTimeout(() => {
  		// 			this.setState({data: originalData.data})
  		// 			resolve()
				// }, 3000);
  		// })
      fetch(`/api/tweets/${this.state.username}`,{method: 'GET',headers:{'Content-Type':'application/json'}})
      .then((response) => {
        if(response.ok) return response.json()
        else return Promise.reject(response)
      })
      .then((data)=>{
          this.setState({data:data.data})
      })
      .catch((error)=>{
        let error_message = ''
          if(error.status === 403){
            error_message = 'This user doesnt exist or has no tweets'
          }else{
            error_message = 'Something Went wrong, Please Try Again'
          }
          this.setState({error : error_message})
          this.props.history.push({
            pathname: '/',
            state: { isError: true , error: error_message}
          })
          return Promise.reject()
      })
  		.then(()=>{
  			this.getDataPerYear()
  		})
      .then(()=>{
        if(this.state.ListYears.length === 1){
          this.setfilter(this.state.ListYears[0])
        }
      })
  		.then(()=>{
  			this.filtering()
  		})
      .then(()=>{
        this.fetchData()
      })
  		.then(()=>{
  			this.getDatePermonth() //remove if not needed later
  		})
  		.then(()=>{
  			this.getPositiveandNegativeData()
  			this.filterPositiveandNegative()
  		})
  		.then(()=>{
  			this.generateDataForGraphs()
  		})
  		.then(()=>{
  			this.setState({Loaded : true})
  		})
  	}
 	componentDidMount(){
 		const {match:{params}} = this.props;
    let mypromise = new Promise(
       resolve =>{
         setTimeout(() => {
           this.setState({ username : params.username})
           resolve()
        }, 500);
      })
      .then(()=>{
        this.LoadData()
      })
 	}
 	render(){
 		const {filterData , DataperYear , Loaded} = this.state
 		return(
 			<div>
 				<Navigation className="w-100"/>
 				<Container className="pt-3">
 						{
 							!Loaded ?  <Row className="pt-3"><Loader/></Row> : this.renderDashboard()
 						}
 				</Container>
 			</div>
 		)
 	}
 }