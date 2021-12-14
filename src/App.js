
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <Switch>
      {/* Route props => All three render methods will be passed the same three route props match location history */}
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            <Movies {...props}/>
          </>
        )}/>
        <Route path='/favourites' component={Favourite} />
      </Switch>
      {/* <Banner/> */}
      {/* <Movies/> name="udai" */}
      {/* <Favourite/> */}
    </Router>

    </>
  );
}

export default App;
