

export default function PathComponent() {
    return (
      <div className="flex  py-8">
        <div className="flex w-full max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-white dark:bg-primary-500">
              <span className="text-sm font-medium">Pick</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-white dark:bg-primary-500">
              <span className="text-sm font-medium">Pack</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white dark:bg-primary-500">
              <span className="text-sm font-medium">Shipped</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white dark:bg-primary-500">
              <span className="text-sm font-medium">Customs</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
            <div className="h-1 flex-1 bg-primary dark:bg-primary-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white dark:bg-primary-500">
              <span className="text-sm font-medium">Delivered</span>
            </div>
          </div>
        
        </div>
      </div>
    )
  }