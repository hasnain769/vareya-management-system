import { getallStatuses, getHoldsInfo } from "@/database/dbOperations"


async function getStatuses(id : any ){
  const statuses = await getallStatuses(id as string)
  console.log(statuses)
  return  statuses

}
async function getHoldData(id : any ){
  const holds = await getHoldsInfo(id)
  return holds
}

interface StatusIndicatorProps {
  id: string;
  cancel: string;
  holdsId : any ;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = async  ({ id, cancel ,holdsId}) => {
  console.log(id , cancel )

  const  statuses = await getStatuses(id)
  const  holdStatus = await getHoldData(holdsId)

  if (holdStatus.length != 0 &&( statuses.some(status => status.status_name === 'packed Out') || statuses.some(status => status.status_name === 'Pick'))) {
    return (
      <div className="flex w-full gap-4 px-4 py-2 mt-1">
      <div className="relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] bg-green-500 text-sm font-medium text-white">
          <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-green-500" />
          <div className="flex items-center justify-center h-full">
            <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-green-500" />
            <div className="flex-1 text-center">New</div>
            <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-green-500 rounded-r-[24px]" />
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] bg-yellow-400 text-sm font-medium text-white">
        <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-green-500" />
        <div className="flex items-center justify-center h-full">
          <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-green-500" />
          <div className="flex-1 text-center">On Hold</div>
          <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-green-500 rounded-r-[24px]" />
        </div>
      </div>
      </div>
    )
  }
    return (
      <div className="flex w-full gap-4 px-4 py-2 mt-1">
        <div className="relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] bg-green-500 text-sm font-medium text-white">
          <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-green-500" />
          <div className="flex items-center justify-center h-full">
            <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-green-500" />
            <div className="flex-1 text-center">New</div>
            <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-green-500 rounded-r-[24px]" />
          </div>
        </div>
        {
          cancel == "canceled" ?
        (<div className="relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] bg-red-700 text-sm font-medium text-white">
          <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-blue-500" />
          <div className="flex items-center justify-center h-full">
            <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-blue-500" />
            <div className="flex-1 text-center">Canceled</div>
            <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-blue-500 rounded-r-[24px]" />
          </div>
        </div>) : (
          <>
          
          <div className={`relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] ${
  statuses.some(status => status.status_name === 'Pick') || statuses.some(status => status.status_name === 'packed Out')
    ? "bg-green-500 text-white"
    : statuses.some(status => status.status_name === 'New')
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gary-500"
}`}>
  <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
  <div className="flex items-center justify-center h-full">
    <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
    <div className="flex-1 text-center"> Picked/Packed</div>
    <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-gray-200 dark:border-l-gray-700 rounded-r-[24px]" />
  </div>
</div>
  <div className={`relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] ${
  statuses.some(status => status.status_name === 'Pick')
    ? "bg-blue-500 text-white"
    : statuses.some(status => status.status_name === 'packed Out')
    ? "bg-green-500 text-white"
    : "bg-gray-200 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
}`}>
    <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
    <div className="flex items-center justify-center h-full">
      <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
      <div className="flex-1 text-center">Shipped</div>
      <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-gray-200 dark:border-l-gray-700 rounded-r-[24px]" />
    </div>
  </div>
<div className={`relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] ${statuses.some(status => status.status_name === 'packed Out') ? "bg-blue-500 text-white" : " bg-gray-200"} text-sm font-medium text-gray-500 `}>
    <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
    <div className="flex items-center justify-center h-full">
      <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
      <div className="flex-1 text-center">Delivered</div>
      <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-gray-200 dark:border-l-gray-700 rounded-r-[24px]" />
    </div>
  </div>
          </>
        )

        }
        
        {/* <button className="px-0 w-[80%] py-1.5 bg-blue-600  text-white text-sm font-medium rounded-sm shadow">
                  Mark Status as Complete
              </button> */}
      </div>
    )
  }
  