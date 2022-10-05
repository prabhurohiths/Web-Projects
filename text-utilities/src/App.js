import './App.css'
import Navbar from './components/Navbar';
import TextForm from './components/TextForm' ; 

function App() {
  return (
    
      <>
        <Navbar title = "Welcome" fake = "Home" />

        <div id = "textform">
            <TextForm/>
        </div>

      </>
  );
}

export default App;
