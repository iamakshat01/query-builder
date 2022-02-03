let classes = {
    andbutton:'m-1 text-white bg-red-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
    orbutton:'m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center',
}

function TabButtons(props) {
    if(props.combine===0) {
        classes.andbutton='m-1 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
        classes.orbutton='m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
    }
    else {
        classes.orbutton='m-1 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
        classes.andbutton='m-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
    }
    return (
        <div className="flex">
            <button className={classes.andbutton} onClick={()=>props.setCombine(0)}>AND</button>
            <button className={classes.orbutton} onClick={()=>props.setCombine(1)}>OR</button>
        </div>
    )
}

export default TabButtons;