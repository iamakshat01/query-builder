import './App.css';
import { useState } from 'react';
import Dropdown from './components/Dropdown';

const classes = {
  maindiv: 'h-screen bg-slate-700',
  querywrap: 'text-center text-white p-4',
  wrapper: 'p-2 bg-slate-800 h-auto flex justify-end',
  wrap:'flex justify-center w-11/12  mt-2',
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

  const [rules,setRules] = useState([{field:'Select Field',operator:'Select Condition',value:''}]);
  const [combine,setCombine] = useState(0); // 0 for AND, 1 for OR
  const [query,setQuery] = useState("");

  function handleConditionChange(condition,index) {
    const newRules=[...rules];
    newRules[index].operator = condition;
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
      field:'Select Field',operator:'Select Condition',value:''
    })
    setRules(newRules);
  }

  function handleInputChange(e,index) {
    const newRules=[...rules];
    newRules[index].value=e.target.value;
    setRules(newRules);
  }

  function handleSubmit() {
    let condition="AND";
    if(combine===1)
      condition="OR"

    let queryObject = {rules,'conditions':condition}

    let joiner='&&'
    if(combine===1)
      joiner='||'

    let querystring = rules.map((params) => {
        let query = " field."+params.field
        
        // operator
        if(params.operator===CONDITIONS[0])
          query+=" == "
        else if(params.operator===CONDITIONS[1])
          query+=" !== "
        else
          query=query+" "+params.operator+" "
        
        // value depending on field
        if(params.field===FIELDS[5])
          query+=params.value;
        else if(params.field===FIELDS[6])
          query+=params.value;
        else
        {
          query+="\""
          query+=params.value;
          query+="\""
        }
        query+=" ";
        return query;
    }).join(joiner)

    console.log(querystring,queryObject);
    setQuery(querystring);
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
        <Dropdown ind={i} handleFieldChange={handleConditionChange} FIELDS={CONDITIONS} entry={entry.operator}/>
      </li>
    )
  })


  const inputList = rules.map((entry,i)=>{
    let inputType="text";
    
    if(entry.field==="Rating")
      inputType="number"
    else if(entry.field==="Time Period")
      inputType="date"
    
      return (
      <li key={i} className={classes.fielditem}>
        <input type={inputType} value={entry.value} placeholder='Value' className={classes.input} onChange={(e)=>handleInputChange(e,i)}></input>
      </li>
    )
  })

  return (
    <div className={classes.maindiv}>
      <div className={classes.querywrap}>
        Resultant Query: {query}
      </div>
      <div className={classes.wrapper}>
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
              <div className="flex">
                <button className={classes.andbutton} onClick={()=>setCombine(0)}>AND</button>
                <button className={classes.orbutton} onClick={()=>setCombine(1)}>OR</button>
              </div>
              <button className={classes.addbutton} onClick={addFilter}>Add Field</button>
            </div>
        </div>
      </div>
      <div className={classes.btngroup}>
          <button className={classes.addbutton} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
  
}

export default App;
