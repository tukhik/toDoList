import {MyName} from './MyName.js'

export function FullName(props) {

	return (
		<div>
		<h1>My full name is {props.fullName}</h1>
		<h2><MyName name = "Tukhik"/></h2>
		</div>

		)
}