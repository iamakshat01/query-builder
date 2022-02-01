import './App.css';
import { useState } from 'react';
const classes = {
  button: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  wrapper: 'mt-5',
  wrap:'flex justify-around',
  menu:'hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700',
  item:'block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white',
  column:'flex flex-col'
}

const FIELDS = ['Theme','Sub-theme','Reason','Language','Source','Rating','Time Period','Customer ID' ];
const CONDITIONS = ['Equals','Does not equal','Like','Not like','Is Empty','Is','Is not'];

function App() {

  const [rules,setRules] = useState([{field:'Theme',condition:'Equals',value:''}]);
  
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
      <>
        <li key={i}>
          <button id="fielddrop" data-dropdown-toggle="fieldmenu" className={classes.button} type="button">
            {entry.field}
          </button>
        </li>
        <div id="fieldmenu" className={classes.menu}>
          <ul className="py-1" aria-labelledby="dropdownButton">
            {fieldOptions(i)}
          </ul>
        </div>
      </>
    )
  })

  const addedConditions = rules.map((entry,i)=>{
    return (
      <>
        <li key={i}>
          <button id="dropdownButton" data-dropdown-toggle="dropdown" className={classes.button} type="button">
            {entry.condition}
          </button>
        </li>
        <div id="dropdown" className={classes.menu}>
          <ul className="py-1" aria-labelledby="dropdownButton">
            {conditionOptions(i)}
          </ul>
        </div>
      </>
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
    </div>
  )
  
}

export default App;
