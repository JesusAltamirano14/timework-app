"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import {timeInputWork } from '../type'
import { deleteTime, modifyTime } from '../redux/features/stateSlice'
import { useAppDispatch } from '../redux/hooks'

interface InputTimeProps{
    time:timeInputWork,
    bg:string,
    setVisibilityTotal:Dispatch<SetStateAction<boolean>>,
    index:number
}

const InputTime = ({time,bg,setVisibilityTotal,index}:InputTimeProps) => {

    const {
        id,
        hoursEntry,
        minutesEntry,
        hoursDeparture,
        minutesDeparture,
        hoursTotalInput,
        minutesTotalInput
    } = time

    const dispatch = useAppDispatch();
    const [edit,setEdit] = useState<boolean>(false);
    const [timeInput,setTimeInput] = useState<timeInputWork>({
        id,
        hoursDeparture:0,
        minutesDeparture:0,
        hoursEntry:0,
        minutesEntry:0,
        hoursTotalInput:0,
        minutesTotalInput:0
    })

    const handleDeleteTime:React.MouseEventHandler<HTMLButtonElement> = () =>{ 
        dispatch(deleteTime(time.id));
        setVisibilityTotal(false)
    }

    const handleClickEdit= () => {
        let selectedTime;
        if(timeInput.minutesEntry>timeInput.minutesDeparture){
            selectedTime={
                hoursTotalInput:timeInput.hoursDeparture-timeInput.hoursEntry-1,
                minutesTotalInput:60+timeInput.minutesDeparture-timeInput.minutesEntry
            }
        }else{
            selectedTime={
                hoursTotalInput:timeInput.hoursDeparture-timeInput.hoursEntry,
                minutesTotalInput:timeInput.minutesDeparture-timeInput.minutesEntry
            }
        }
        setTimeInput({...timeInput,...selectedTime});
        dispatch(modifyTime({...timeInput,...selectedTime}));
        setEdit(false);
        setVisibilityTotal(false)
    }
    const handleChangeInput:React.ChangeEventHandler<HTMLInputElement> = (event) => {

        const string = event.target.value;
        const array = string.split(':');
        const minutes = parseInt(array[1]);
        const hours = parseInt(array[0]);
        if(event.target.name==='entry'){
          setTimeInput({
            ...timeInput,
            hoursEntry:hours,
            minutesEntry:minutes
          });
        }else{
          setTimeInput({
            ...timeInput,
            hoursDeparture:hours,
            minutesDeparture:minutes
          })
        }

      }

  return (
    <div className={`grid grid-cols-12 gap-1 w-full h-10 items-center bg-red-500 font-light  text-xs ${bg} xl:text-lg`}>
        <div className='font-bold col-span-1 flex justify-center'>
            <h1>{`${index+1}.`}</h1>
        </div>
        {!edit?(
        <>
        <div className=' col-span-3'>
            <span className=''>{hoursEntry>=10?hoursEntry:`0${hoursEntry}`}:{minutesEntry>=10?minutesEntry:`0${minutesEntry}`}</span>
        </div>
        <div className=' col-span-3'>
            <span>{hoursDeparture>=10?hoursDeparture:`0${hoursDeparture}`}:{minutesDeparture>=10?minutesDeparture:`0${minutesDeparture}`}</span>
        </div>
        </>):<>
            <input type="time" id="entry" className='col-span-3' onChange={handleChangeInput} name="entry"/>
            <input type="time" id="departure" className='col-span-3' onChange={handleChangeInput} name="departure"/>
        </>}
        {!edit?(<>
        <div className=' col-span-3'>
            <span>{time.hoursTotalInput}h {time.minutesTotalInput}m</span>
        </div>
        <button className='col-span-1 w-full flex justify-center' onClick={()=>{setEdit(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black xl:active:scale-110 xl:w-6 xl:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>
        <button onClick={handleDeleteTime} className='flex justify-center col-span-1 w-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black hover:text-red-500 xl:active:scale-110 xl:w-6 xl:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </button></>):
        <div className='col-span-5 w-full flex justify-center'>
            <button onClick={handleClickEdit} className='flex justify-center' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                </svg>
            </button>
        </div>}
    </div>
  )
}

export default InputTime