import {Name} from './Name.jsx'
import React, {Component} from 'react'
import {Price} from './Price.jsx'
import {Description} from './Description.jsx'


export class Product extends Component {
  render() {
    return <div>
    	<Name name = {this.props.name}/>
    	<Price price = {this.props.price}/>
    	<Description description = {this.props.description}/>
    </div>;
  }
  ///<Product name=”banabas” price=”1$” description=”Fresh bananas from Ecuador” />
}