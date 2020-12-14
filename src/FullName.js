import {Name} from './Name.js'

export function FullName(props) {

	return (
		<div>
		<h1>My full name is {props.fullName}</h1>
		<h2><Name name = "Tukhik"/></h2>
		</div>

		)
}