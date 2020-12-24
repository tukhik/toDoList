import react, {Component} from 'react';
import './index.css';

export default class Input extends Component {
	state = {
		text: " ",
		inputValue: " ",
		arr: []
	};
	handleChange = (event)=>{
		this.setState({
			inputValue: event.target.value
		});
	};
	
 	
	handleClick =()=>{
		this.setState({
			text: this.state.inputValue,
			inputValue: "",
			arr: [...this.state.arr, this.state.inputValue]
		})
	}
	render(){ 
		return(<div>
			<input value ={this.state.inputValue}
			type = "text" 
			onChange = {this.handleChange}/>
			<button onClick = {this.handleClick}> Click me</button>
			<ul>
			 {this.state.arr.map(item => (
            <li key={item}>{item}</li>
          ))}
			</ul>
		</div>)
	}
}
