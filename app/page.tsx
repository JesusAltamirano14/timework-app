"use client"
import { useState } from "react";
import { timeInputWork, timeWork } from "./type";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { addTime } from "./redux/features/stateSlice";
import InputTime from "./components/InputTime";

interface timeFinalType {
  hoursFinal:number,
  minutesFinal:number,
}

export default function Home() {


  const [visibilityTable,setVisibilityTable] = useState<boolean>(false);
  const [visibilitytotal,setVisibilityTotal] = useState<boolean>(false);
  const arrayTimes = useAppSelector(state => state.arrayTimes)
  const dispatch = useAppDispatch();

  const [timeFinal,setTimeFinal] = useState<timeFinalType>({
    hoursFinal:0,
    minutesFinal:0
  })
  const [idTime ,setIdTime] = useState<number>(0)
  const generatedID = `${idTime}-${Date.now()}`;
  const [timeEntry,setTimeEntry] = useState<timeWork>({
    hours:0,
    minutes:0
  })

  const [timeDeparture,setTimeDeparture] = useState<timeWork>({
    hours:0,
    minutes:0
  })

  const [timeTotalInput,setTimeTotalInput] = useState<timeWork>({
    hours:0,
    minutes:0
  })

  const handleChangeInput:React.ChangeEventHandler<HTMLInputElement> = (event) => {

    const string = event.target.value;
    const array = string.split(':');
    const minutes = parseInt(array[1]);
    const hours = parseInt(array[0]);
    if(event.target.name==='entry'){
      setTimeEntry({
        minutes,
        hours
      });
    }else{
      setTimeDeparture({
        minutes,
        hours
      })
    }
  }

  const handleClickAddTime = () => {

    let selectedTimeTotalInput : timeWork;
    if(timeDeparture.minutes<timeEntry.minutes){
      selectedTimeTotalInput={
        hours:timeDeparture.hours-timeEntry.hours-1,
        minutes:60+timeDeparture.minutes-timeEntry.minutes
      }
    }else{
        selectedTimeTotalInput={
          hours:timeDeparture.hours-timeEntry.hours,
          minutes:timeDeparture.minutes-timeEntry.minutes,
        }
      }
      setTimeTotalInput(selectedTimeTotalInput);

      dispatch(addTime({
        id:generatedID,
        hoursDeparture:timeDeparture.hours,
        minutesDeparture:timeDeparture.minutes,
        hoursEntry:timeEntry.hours,
        minutesEntry:timeEntry.minutes,
        hoursTotalInput:selectedTimeTotalInput.hours,
        minutesTotalInput:selectedTimeTotalInput.minutes
      }))
      setIdTime(prevState=>prevState+1);

      setVisibilityTable(true);
      setVisibilityTotal(false);
  }

  function getSumTotal(array:Array<timeInputWork>,arg:'hoursTotalInput' | 'minutesTotalInput'){
    const suma = array.reduce((accumulator,time)=>(time[arg]+accumulator),0)
    return suma;
  }

  const handleClickTotal:React.MouseEventHandler<HTMLButtonElement> = () => {

    const hoursTotales = getSumTotal(arrayTimes,'hoursTotalInput');
    const minutesTotal = getSumTotal(arrayTimes,'minutesTotalInput');

    if(minutesTotal>=60){
      const newMinutesTotal = minutesTotal%60;
      const quotient = Math.floor(minutesTotal/60);
      setTimeFinal({
        hoursFinal:hoursTotales + quotient,
        minutesFinal:newMinutesTotal
      })
    }else {
      setTimeFinal({
        hoursFinal:hoursTotales,
        minutesFinal:minutesTotal,
      })
    }
    setVisibilityTotal(true);
  
  }

  return (
    <div className={`bg-white h-screen ${visibilityTable?'':'flex flex-col justify-center'}`}>
      <h1 className="font-bold mx-auto block text-center my-6">Horas de trabajo</h1>
      <div className="flex justify-around mb-6 items-center text-sm">
        <label className="font-bold" htmlFor="entry">Entrada:</label>
        <input type="time" id="entry" onChange={handleChangeInput} name="entry"/>
        <label htmlFor="departure" className="font-bold">Salida:</label>
        <input type="time" id="departure" onChange={handleChangeInput} name="departure"/>
        <button className="w-10 flex flex-col justify-center items-center rounded-xl " onClick={handleClickAddTime}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="text-[9px] text-black">Add</h4>
        </button>
      </div>     
      {visibilityTable?(
      <div className="flex flex-col rounded-xl overflow-hidden mx-2 border-slate-300 border-2">
        <div className="grid grid-cols-12 gap-1 h-10 font-medium text-sm items-center bg-blue-200">
          <h1 className="col-span-1 text-center text-xs lg:text-lg">#</h1>
          <h1 className="col-span-3 text-xs lg:text-lg">entrada</h1>
          <h1 className="col-span-3 text-xs lg:text-lg">salida</h1>
          <h1 className="col-span-3 text-xs lg:text-lg">tiempo</h1>
          <h1 className='col-span-2 text-center text-xs lg:text-lg'>Acciones</h1>
        </div>
        <div className="flex flex-col items-center">
          {arrayTimes?.map((time,index)=>(<InputTime bg={index%2==0?'bg-slate-200':'bg-white'} key={index} index={index}time={time} setVisibilityTotal={setVisibilityTotal}/>))}
        </div>
        <div className="flex flex-col font-bold justify-center items-center">
          <button className="my-5 w-1/3 bg-blue-300  rounded-md xl:w-1/12 xl:p-1" onClick={handleClickTotal}>Calcular total</button>
          {visibilitytotal?(<div className="flex gap-4 pb-6">
            <h1>Tiempo Total: </h1>
            <h1 className="font-mono">{timeFinal.hoursFinal}h {timeFinal.minutesFinal}min</h1>
          </div>):null}
        </div>
      </div>):null}
    </div>
  )
}
