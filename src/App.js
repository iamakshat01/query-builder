import './App.css';
import { useState } from 'react';

const classes = {
  button: 'text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
  wrapper: 'relative mt-12 bg-red-50 h-96',
  wrap:'flex justify-around',
  menu:'hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700',
  item:'block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white',
  column:'flex flex-col',
  addbutton:'absolute bottom-0 left-10 mb-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
  fielditem:'mt-2'
}

const FIELDS = ['Theme','Sub-theme','Reason','Language','Source','Rating','Time Period','Customer ID' ];
const CONDITIONS = ['Equals','Does not equal','Like','Not like','Is Empty','Is','Is not'];

function App() {

  const [rules,setRules] = useState([{field:'Select Theme',condition:'Select Condition',value:''}]);
  
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

  const fieldOptions = (ind) => FIELDS.map((field,i)=>{
    return (
      <li key={i}>
        <span className={classes.item} onClick={()=>handleFieldChange(field,ind)}>{field}</span>
       </li>
    )
  })

  const conditionOptions = (ind) => CONDITIONS.map((condition,i)=>{
    return (
      <li key={i}>
        <span className={classes.item} onClick={()=>handleConditionChange(condition,ind)}>{condition}</span>
       </li>
    )
  })

  const addedFields = rules.map((entry,i)=>{
    return (
        <li key={i} className={classes.fielditem}>
          <button id={"fielddrop"+i} data-dropdown-toggle={"fieldmenu"+i} className={classes.button} type="button">
            {entry.field}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-w w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div id={"fieldmenu"+i} className={classes.menu}>
            <ul className="py-1" aria-labelledby={"fielddrop"+i}>
              {fieldOptions(i)}
            </ul>
          </div>
        </li>
    )
  })

  const addedConditions = rules.map((entry,i)=>{
    return (
        <li key={i} className={classes.fielditem}>
          <button id={"conddrop"+i} data-dropdown-toggle={"condmenu"+i} className={classes.button} type="button">
            {entry.condition}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-w w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div id={"condmenu"+i} className={classes.menu}>
            <ul className="py-1" aria-labelledby={"conddrop"+i}>
              {conditionOptions(i)}
            </ul>
          </div>
        </li>
    )
  })

  return (
    <div className={classes.wrapper}>
      
      <div className={classes.wrap}>
          <div className={classes.column}>
            Field
            {addedFields}

          </div>

          <div className={classes.column}>
            Condition
            {addedConditions}
          </div>

          <div  className={classes.column}>
            Value
          </div>

      </div>

      <button className={classes.addbutton} onClick={addFilter}>Add filter</button>
    </div>
  )
  
}

export default App;
