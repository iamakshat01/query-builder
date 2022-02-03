import React,{useState} from 'react';

const classes = {
    wrap:'relative',
    button: 'z-0 w-1/2 text-white bg-slate-600 hover:bg-slate-500 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex justify-between',
    menu:'absolute z-10 mt-1 w-44 text-base list-none bg-gray-700 rounded divide-y divide-gray-600 shadow',
    item:'block py-2 px-4 text-sm text-white hover:bg-gray-600',
    fielditem:'mt-2'
}

export default function Dropdown(props) {
    const [open, setOpen] = useState(false);
    const fieldOptions = (ind) => props.FIELDS.map((field,i)=>{
        return (
          <li key={i}>
            <span className={classes.item} onClick={()=>{props.handleFieldChange(field,ind);setOpen(!open)}}>{field}</span>
           </li>
        )
    })
    return (
        <div className={classes.wrap}>
            <span className={classes.button} onClick={()=>setOpen(!open)}>
                {props.entry}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </span>
            {open && (<ul className={classes.menu}>
                {fieldOptions(props.ind)}
            </ul>)}
        </div>
    )
}