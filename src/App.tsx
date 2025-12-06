import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import { Provider } from "react-redux";
import { store } from "./redux/store";


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
