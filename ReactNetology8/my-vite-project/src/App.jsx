import messages from './messages.json';
import MessageHistory from './MessageHistory';
import './App.css';

function App() {
  return (
    <div className="chat-container">
      <MessageHistory list={messages} />
    </div>
  );
}

export default App;