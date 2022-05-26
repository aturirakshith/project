import "./App.css";
import FileSystemTable from "./FileSystem/FileSystemTable";
import Data, { props } from "./data2";
import Foo from "./Foo";
function App() {
  return (
    <>
      <FileSystemTable {...props} />
      <Foo />
    </>
  );
}

export default App;
