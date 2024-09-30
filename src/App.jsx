import { Provider } from "react-redux";
import InboxScreen from "./components/InboxScreen";
import store from "./lib/store";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App
