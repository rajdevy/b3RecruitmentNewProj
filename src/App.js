import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Router from "./routes/Router";

function App() {
  return (
    <div className="app">
      <Router />
      <ToastContainer
        position="top-right"
        style={{marginRight:"155px"}}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
