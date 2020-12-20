import React, {Component} from 'react'

export class Description extends Component {
  render() {
    return <h2>{this.props.description}</h2>;
  }
  ///<Product name=”banabas” price=”1$” description=”Fresh bananas from Ecuador” />
}