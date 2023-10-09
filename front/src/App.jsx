import './App.css';
import {Routes, Route} from 'react-router-dom';

import Main from './pages/Main'
import List from './pages/List'
import Search from './pages/Search'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/list' element={<List></List>}></Route>
        <Route path='/search?key=' element={<Search></Search>}></Route>
        <Route path='*' element={<div>404 Not Found</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
