import './App.css';
import Login from './components/login';
import ErrorBoundary from './routes/errorBoundary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
         
          <Login />
                   
        </div>
      </header>
    </div>
  );
}

export default App;
