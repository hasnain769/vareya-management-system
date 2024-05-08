import { getShippedStatus ,getPickStatus } from "@/database/dbOperations"


async function getStatuses(id : any){
  const pick = await getPickStatus(id as number)
  const ship = await getShippedStatus(id as string)
  console.log(ship)
  return {pick ,ship}

  getShippedStatus

}
interface StatusIndicatorProps {
  id: string;
  cancel: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = async  ({ id, cancel }) => {
  console.log(id)

  const {pick , ship } = await getStatuses(id)
  console.log(ship)
  console.log(pick)
    return (
      <div className="flex items-center justify-center w-full gap-4 px-4 py-2 mt-1">
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
          
          <div className={`relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] ${pick.length > 0 ||ship.length > 0 && "bg-green-500 text-white"} bg-gray-200 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400`}>
          <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
          <div className="flex items-center justify-center h-full">
            <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
            <div className="flex-1 text-center"> Picked/Packed</div>
            <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-gray-200 dark:border-l-gray-700 rounded-r-[24px]" />
          </div>
        </div>
        <div className={`relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] ${ship.length > 0  && "bg-green-500 text-white"} bg-gray-200 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400`}>
          <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
          <div className="flex items-center justify-center h-full">
            <div className="absolute left-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-l-4 border-t-transparent border-l-transparent border-r-4 border-r-gray-200 dark:border-r-gray-700" />
            <div className="flex-1 text-center">Shipped</div>
            <div className="absolute right-0 top-1/2 w-0 h-0 -translate-y-1/2 border-t-4 border-r-4 border-t-transparent border-r-transparent border-l-4 border-l-gray-200 dark:border-l-gray-700 rounded-r-[24px]" />
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full max-w-md h-8 rounded-r-[24px] bg-gray-200 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
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
  