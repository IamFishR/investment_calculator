import { Header } from "./components/Header";
import { Investment } from "./components/Investment";
function App() {
  return (
    <div className="App min-h-screen flex justify-center items-center flex-col bg-slate-800 py-20">
      <Header />
      <Investment />
    </div>
  );
}

export default App;
