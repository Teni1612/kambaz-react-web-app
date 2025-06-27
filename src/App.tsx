// import './App.css'
import Kambaz from "./Kambaz";
import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function App() {

  const [isBackendReady, setIsBackendReady] = useState(false);
  const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const res = await fetch(`${REMOTE_SERVER}/ping`);
        if (res.ok) {
          setIsBackendReady(true);
        } else {
          setTimeout(pingBackend, 2000);
        }
      } catch {
        setTimeout(pingBackend, 2000);
      }
    };

    pingBackend();
  }, []);

  if (!isBackendReady) return <Loader />;
  
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App
