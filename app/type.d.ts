export interface timeWork{
    hours:number,
    minutes:number,
}

export interface timeInputWork{
    id:string,
    hoursDeparture:number,
    minutesDeparture:number,
    hoursEntry:number,
    minutesEntry:number,
    hoursTotalInput:number,
    minutesTotalInput:number,
}


export interface arrayTimesType{
    arrayTimes:Array<timeInputWork>
}