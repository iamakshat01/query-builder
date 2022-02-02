import './App.css';
import { useState } from 'react';
import Dropdown from './components/Dropdown';

const classes = {
  maindiv: 'h-screen bg-slate-700',
  querywrap: 'text-center text-white p-4',
  wrapper: 'p-2 bg-slate-800 h-auto flex justify-end',
  wrap:'flex justify-center w-11/12 mt-2',
  column:'flex flex-col w-1/4',
  addbutton:'m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
  fielditem:'mt-1 mb-1',
  heading:'text-white text-base',
  input:'text-white bg-slate-600 hover:bg-slate-500 font-medium rounded-lg text-sm px-4 py-2.5',
  btngroup:'flex justify-center',
  andbutton:'m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
  orbutton:'m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
}

const FIELDS = ['Theme','Sub-theme','Reason','Language','Source','Rating','Time Period','Customer ID' ];
const CONDITIONS = ['Equals','Does not equal','Like','Not like','Is Empty','Is','Is not'];

function App() {

  const [rules,setRules] = useState([{field:'Select Theme',condition:'Select Condition',value:''}]);
  const [combine,setCombine] = useState(0); // 0 for AND, 1 for OR

  function handleConditionChange(condition,index) {
    const newRules=[...rules];
    newRules[index].condition = condition;
    setRules(newRules);
  }

  function handleFieldChange(field,index) {
    const newRules=[...rules];
    newRules[index].field = field;
    setRules(newRules);
  }

  function addFilter() {
    const newRules=[...rules];
    newRules.push({
      field:'Select Theme',condition:'Select Condition',value:''
    })
    setRules(newRules);
  }

  function handleInputChange(e,index) {
    const newRules=[...rules];
    newRules[index].value=e.target.value;
    setRules(newRules);
  }


  const addedFields = rules.map((entry,i)=>{
    return (
        <li key={i} className={classes.fielditem}>
          <Dropdown ind={i} handleFieldChange={handleFieldChange} FIELDS={FIELDS} entry={entry.field}/>
        </li>
    )
  })

  const addedConditions = rules.map((entry,i)=>{
    return (
      <li key={i} className={classes.fielditem}>
        <Dropdown ind={i} handleFieldChange={handleConditionChange} FIELDS={CONDITIONS} entry={entry.condition}/>
      </li>
    )
  })


  const inputList = rules.map((entry,i)=>{
    return (
      <li key={i} className={classes.fielditem}>
        <input value={entry.value} placeholder='Value' className={classes.input} onChange={(e)=>handleInputChange(e,i)}></input>
      </li>
    )
  })

  return (
    <div className={classes.maindiv}>
      <div className={classes.querywrap}>
        Resultant Output
      </div>
      <div className={classes.wrapper}>
        <div className="flex h-10">
          <button className={classes.andbutton} onClick={()=>setCombine(0)}>AND</button>
          <button className={classes.orbutton} onClick={()=>setCombine(1)}>OR</button>
        </div>
        <div className={classes.wrap}>
            <div className={classes.column}>
              <div className={classes.heading}>Field</div>
              <ul>
                {addedFields}
              </ul>
            </div>

            <div className={classes.column}>
              <div className={classes.heading}>Condition</div>
              <ul>
                {addedConditions}
              </ul>
            </div>

            <div  className={classes.column}>
              <div className={classes.heading}>Value</div>
              <ul>
                {inputList}
              </ul>
            </div>

            <div>
              <button className={classes.addbutton} onClick={addFilter}>Add Field</button>
            </div>
        </div>
      </div>
      <div className={classes.btngroup}>
          <button className={classes.addbutton} onClick={addFilter}>Submit</button>
      </div>
    </div>
  )
  
}

export default App;
