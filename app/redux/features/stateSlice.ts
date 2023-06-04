import { arrayTimesType, timeInputWork } from "@/app/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : arrayTimesType= {
    arrayTimes:[]
}

// interface modifyActionType {
//     id:number,
//     body:
// }

export const stateSlice = createSlice({
    name:'timeWork',
    initialState,
    reducers:{
        addTime : (state, action:PayloadAction<timeInputWork>) => {
            state.arrayTimes = [...state.arrayTimes,action.payload];
        },
        deleteTime: (state,action:PayloadAction<string>) => {
            state.arrayTimes = state.arrayTimes.filter((time)=>(time.id!==action.payload));
        },
        modifyTime: (state,action:PayloadAction<timeInputWork>) => {
            const {hoursDeparture,minutesDeparture,hoursEntry,minutesEntry,hoursTotalInput,minutesTotalInput} = action.payload;
            state.arrayTimes = state.arrayTimes.map((time)=>{
                if(action.payload.id === time.id){
                    return {...time,hoursDeparture,minutesDeparture,hoursEntry,minutesEntry,hoursTotalInput,minutesTotalInput}
                }
                return time;
            })
        }
    }
})

export default stateSlice.reducer;
export const {addTime,deleteTime,modifyTime} = stateSlice.actions;