import './App.css';
import {FullName} from './FullName.js'
import {MyGithubLink} from './MyGithubLink.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <FullName fullName = "Tukhik Gharagyozyan"/>
        <MyGithubLink href = 'https://github.com/tukhik' />
        </header>
    </div>
  );
}

export default App;
