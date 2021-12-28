import { FolderView } from './components';
// icons and styles
import './App.scss';



function App() {
  return (
    <div className="app">
      <header>
          <h1>Web Directory</h1>
      </header>
      <main>
        <FolderView />
      </main>
      <footer>
        made by Ashwin with &hearts;
      </footer>
    </div>
  );
}

export default App;
