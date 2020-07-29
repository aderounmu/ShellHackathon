import React, {useState ,useEffect}from 'react'
import { Container , Col , Row , Card,Table , Form , Badge} from 'react-bootstrap'
import { ResponsiveContainer,LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Line,Legend , PieChart , Pie} from'recharts'
import { Cell, LabelList } from 'recharts'
import ReactWordcloud from 'react-wordcloud'
import 'd3-transition';
import { select } from 'd3-selection';


function getCallback(callback) {
  return function(word, event) {
    const isActive = callback !== 'onWordMouseOut';
    const element = event.target;
    const text = select(element);
    text
      .on('click', () => {
        return 0
      })
      .transition()
      .attr('background', 'white')
      .attr('font-size', isActive ? '300%' : '100%')
      .attr('text-decoration', isActive ? 'underline' : 'none');
  };
}

const callbacks = {
  getWordColor: word => (word.value > 25 ? '#39a4fa' : '#f32151'),
  getWordTooltip: word =>
    `The word "${word.text}" appears ${word.value} times.`,
  onWordClick: getCallback('onWordClick'),
  onWordMouseOut: getCallback('onWordMouseOut'),
  onWordMouseOver: getCallback('onWordMouseOver'),
};


export default function DashboardLayout(props){

	const[ itemRange, setitemRange] = useState(20)
	const[filterValue,setfilterValue] = useState(null)

	const style ={
		AverageLabel:{
			color : props.Average > 0.5 ? '#39a4fa': '#f32151',
			top : '50px'
		}
	}

	const colors = ['#39a4fa','#f32151']
	return(
		<>
			<Row>
				<Col sm={9}>
					<div className="h1 font-weight-lighter"> Welcome {props.username}</div>
				</Col>
				<Col sm={3}>
					<div className="h4 text-sm-right">{ props.filtered ? ` Data from ${props.filter}` : 'All Data'  }</div>
				</Col>
				<Col className="d-block d-sm-none">
				{
					<Form.Control as="select" onChange={(e)=>{ setfilterValue(e.target.value) ; props.setfilter(e.target.value)}}>
						<option>All Data</option>
						{props.Years.map((item)=>(<option>{item}</option>))}
  					</Form.Control>
				}
				</Col>
			</Row>
			<Row clasName="mx-0">
				<Row className="my-2 w-100 mx-0">
					<Col sm={4} className="my-sm-0 my-2">
						<Card className="shadow-sm border-0">
							<Card.Body>
								<Card.Title>Average Sentiment</Card.Title>
							    <Card.Text>
							    	<div className = "h3 position-absolute" style={style.AverageLabel}> 
							    	{props.Average}</div>
							        <ResponsiveContainer width="100%" aspect={3.2}>
								        <PieChart>
									        <Pie
									          data={props.PieData}
									          cx="50%"
									          cy="98%"
									          startAngle={180}
									          endAngle={0}
									          innerRadius={30}
									          outerRadius={50}
									          fill="#8884d8"
									          paddingAngle={5}
									          dataKey="value"
									          
									        > 
									        {
										        props.PieData.map((entry, index) => (
											        <Cell key={`cell-${index}`} fill={colors[index]}/>
										      	)) 
										    }
									        </Pie>
									        <Tooltip />
									        <Legend height={10}/>
								      </PieChart>
							        </ResponsiveContainer>
							    </Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={4}  className="my-sm-0 my-2 ">
						<Card className="shadow-sm border-0">
							<Card.Body>
							    <Card.Title>Postive</Card.Title>
							    <Card.Text>
							        <Row className="mx-0">
							        	<Col>
							        		<div className="h3">
							        		{ props.PositiveCount}
							        		</div>
							        
							        	</Col>
							        	<Col>
							        		<ResponsiveContainer width="100%" height={90}>
							        			<LineChart data={props.LineData}>
        											<Line type='linear' dot={false} dataKey='Positive' stroke='#39a4fa' strokeWidth={2} />
      											</LineChart>
							        		</ResponsiveContainer>
							        	</Col>
							        </Row>
							    </Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={4} className="my-sm-0 my-2">
						<Card className="shadow-sm border-0">
							<Card.Body>
								<Card.Title>Negative</Card.Title>
							    <Card.Text>
							        	<Row className="mx-0">
								        	<Col>
								        		<div className="h3">
								        		{ props.NegativeCount}
								        		</div>
								        	</Col>
								        	<Col>
								        		<ResponsiveContainer width="100%" height={90}>
								        			<LineChart data={props.LineData}>
	        											<Line type='linear' dot={false} dataKey='Negative' stroke='#f32151' strokeWidth={2} />
	      											</LineChart>
								        		</ResponsiveContainer>
								        	</Col>
							        </Row>
							    </Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row className="my-2 w-100 mx-0">
					<Col sm={8} className="my-sm-0 my-2">
						<Card className="shadow-sm border-0">
							<Card.Body>
								<Card.Title>

								<Row className="mx-0">
									<Col sm={9}>Sentiment Growth</Col>
									<Col sm={3} className="d-none d-sm-block">
										<Form.Control as="select" onChange={(e)=>{ setfilterValue(e.target.value) ; props.setfilter(e.target.value)}}>
    										<option>All Data</option>
    										{props.Years.map((item)=>(<option>{item}</option>))}
  										</Form.Control>
									</Col>
								</Row>

								</Card.Title>
							    <Card.Text>
							    	<ResponsiveContainer width="100%" aspect={2}>
								    	<LineChart data={props.LineData}
										  margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
										  <CartesianGrid/>
										  <XAxis dataKey="name" />
										  <YAxis />
										  <Tooltip />
										  <Legend />
										  <Line type="monotone" dataKey="Positive" stroke="#39a4fa" strokeWidth={3}/>
										  <Line type="monotone" dataKey="Negative" stroke="#f32151" strokeWidth={3} />
										</LineChart>
							    	</ResponsiveContainer>
							    </Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={4}>
						<Card className="shadow-sm border-0">
							<Card.Body>
								<Card.Title>Word Cloud</Card.Title>
							    <Card.Text>
							        <div style={{ height: 350, width: '90%' }}>
								       <ReactWordcloud callbacks={callbacks} words={props.WordCloud} />
								    </div>
							    </Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row className="my-2 w-100 mx-0">
					<Col>
						<Card className="shadow-sm border-0 overflow-auto">
							<Card.Body>
								<Card.Title>Tweets</Card.Title>
							    <Card.Text>
							    

								       <Table striped bordered hover size="sm">
										  <thead>
										    <tr>
										      <th>Date</th>
										      <th>Time</th>
										      <th>Text</th>
										      <th>Sentiment Value</th>
										    </tr>
										  </thead>
										  <tbody>
										    {
										    	props.rawData.slice(0,itemRange).map((item)=>(
												    <tr>
												    	<td >{item.date}</td>
													    <td>{item.time}</td>
													    <td className="text-wrap w-25">{item.text}</td>
													    <td>{item.sentiment}</td>
												    </tr>
												))
											}
										  </tbody>
										</Table>
							    </Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Row>
		</>
	)
}