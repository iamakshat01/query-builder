import './App.css';
import { useState } from 'react';
import SingleRule from './components/Singlerule';

const classes = {
  maindiv: 'h-screen bg-slate-700',
  querywrap: 'text-center text-white p-4',
  addbutton:'m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
  btngroup:'flex justify-center',
  addgroup:'my-1 mx-2 text-white bg-stone-500 hover:bg-stone-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
}

function App() {

  const [query,setQuery] = useState("");
  const [refresh,setRefresh] = useState(0); // submit token for child components
  function handleSubmit() {
    setRefresh(refresh => refresh+1);
  }
  return (
    <div className={classes.maindiv}>
      <div className={classes.querywrap}>
        Resultant Query: {query}
      </div>
      <SingleRule query={query} setQuery={setQuery} refresh={refresh}/>
      <div className={classes.btngroup}>
          {/* <button className={classes.addgroup}>Add Group</button> */}
          <button className={classes.addbutton} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
  
}

export default App;
