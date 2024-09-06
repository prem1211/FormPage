import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import FormPage from "./components/FormPage";

const App= () => {
  return (
    <PrimeReactProvider>
      <FormPage />
    </PrimeReactProvider>
  );
}

export default App;
