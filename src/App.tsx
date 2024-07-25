import { ContextProvider } from "./context/AuthContext";
import { PageRouter } from "./router/PageRouter";

function App() {
  return (
    <>
      <ContextProvider>
        <PageRouter />
      </ContextProvider>
    </>
  );
}

export default App;
