export default function DateBox({day,date,month}:showDate){
    return(
        <>
            <div className="flex flex-col justify-center items-center text-sm  font-bold text-white  bg-rose-500 w-15 lg:w-15 rounded-lg">
                <div>{day}</div>
                <div>{date}</div>
                <div>{month}</div>
            </div>

        </>
    )
}