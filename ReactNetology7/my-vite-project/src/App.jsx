import data from './etsy.json';
import Listing from './Listing';
import './App.css';

function App() {
  const validItems = data.filter((item) => item.MainImage);

  return <Listing items={validItems} />;
}

export default App;
