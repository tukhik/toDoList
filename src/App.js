import './App.css';
import {Product} from './Product.jsx'
import {FullName} from './FullName.js'
import {MyGithubLink} from './MyGithubLink.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <FullName fullName = "Tukhik Gharagyozyan"/>
        <MyGithubLink href = 'https://github.com/tukhik' />
        <Product price= {"1$"}  description = " Fresh bananas from Ecuador" name=" banabas"/>
        </header>
    </div>
  );
}

export default App;
