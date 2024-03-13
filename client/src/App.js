import './App.css';
import Login from './components/Login';
import Error from './components/Error';
import Signup from './components/Signup';
import MyComponent from './components/editor';
import {BrowserRouter , Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/doc" element={<MyComponent/>}/>
        <Route path="/doc/:name" element={<MyComponent/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
