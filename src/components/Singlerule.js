import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import TabButtons from './TabButtons';

const classes = {
    wrapper: 'p-2 bg-slate-800 h-auto flex justify-end',
    wrap:'flex justify-center w-11/12  mt-2',
    column:'flex flex-col w-1/4',
    addbutton:'m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
    fielditem:'mt-1 mb-1',
    heading:'text-white text-base',
    input:'text-white bg-slate-600 hover:bg-slate-500 font-medium rounded-lg text-sm px-4 py-2.5',
    btngroup:'flex justify-center',
    addgroup:'my-1 mx-2 text-white bg-stone-500 hover:bg-stone-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
    inputitem:'mt-1 mb-1 flex'
}
  
const FIELDS = ['Theme','Sub-theme','Reason','Language','Source','Rating','Time Period','Customer ID' ];
const CONDITIONS = ['Equals','Does not equal','Like','Not like','Is Empty','Is','Is not'];

function SingleRule(props) {

    const [rules,setRules] = useState([{field:'Select Field',operator:'Select Condition',value:''}]);
    const [combine,setCombine] = useState(0); // 0 for AND, 1 for OR
    
    // responds to submit button in parent
    useEffect(()=>{
        if(props.refresh!==0)
        handleSubmit();
    },[props.refresh])

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
    
    function handleFieldDelete(index) {
      const newRules=[...rules];
      newRules.splice(index,1);
      setRules(newRules);
    }

    // generates query
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
          else {
            query+="\""
            query+=params.value;
            query+="\""
          }
          query+=" ";
          return query;
      }).join(joiner)
  
      console.log(queryObject);
      props.setQuery(querystring);
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
        <li key={i} className={classes.inputitem}>
          <input type={inputType} value={entry.value} placeholder='Value' className={classes.input} onChange={(e)=>handleInputChange(e,i)} required></input>
          <button onClick={() => handleFieldDelete(i)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white my-1 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </li>
      )
    })
  
    return (
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
                <TabButtons combine={combine} setCombine={setCombine}/>
                <button className={classes.addbutton} onClick={addFilter}>
                  Add Field
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
          </div>
        </div>
    )
    
  }
  
  export default SingleRule;