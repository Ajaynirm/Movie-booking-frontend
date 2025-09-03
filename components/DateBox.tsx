export default function DateBox({day,date,month}:showDate){
    return(
        <>
            <div className="flex flex-col justify-center items-center text-sm  font-semibold text-white  bg-rose-400   w-15 rounded-lg">
                <div>{day}</div>
                <div>{date}</div>
                <div>{month}</div>
            </div>

        </>
    )
}