import { FolderView, FolderHead, Popup } from './components';
// icons and styles
import './App.scss';

const FolderPopup = Popup( FolderView, FolderHead ) ;


function App() {
  return (
    <div className="app">
      <header>
          <h1>Web Directory</h1>
      </header>
      <main>
        <FolderPopup state = { true } toggleState={ ( state: boolean ) => null } />
      </main>
      <footer>
        made by Ashwin with &hearts;
      </footer>
    </div>
  );
}

export default App;
