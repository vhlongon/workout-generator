export const WorkoutCardSkeleton = () => {
  return (
    <div className="card shadow-md w-full p-4 bg-neutral">
      <div className="flex gap-4 items-center mb-4">
        <div className="flex flex-col gap-2">
          <div className="w-16 h-3 bg-base-200 animate-pulse rounded-lg"></div>
          <div className="w-36 h-4 bg-base-200 animate-pulse rounded-lg"></div>
        </div>
      </div>

      <div className="collapse collapse-arrow text-base-100 border border-base-100 mb-2">
        <input type="checkbox" />
        <div className="flex gap-1 items-center collapse-title">
          <div className="w-24 h-4 bg-base-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="collapse-content">
          <ul className="flex flex-1 flex-col gap-2 pl-2">
            {[1, 2, 3].map(index => (
              <li className="text-sm" key={index}>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-base-200 animate-pulse"></span>
                  <div className="w-24 h-3 bg-base-200 animate-pulse mt-1 animate-bg"></div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="collapse collapse-arrow text-base-100 border border-base-100">
        <input type="checkbox" />
        <div className="flex gap-1 items-center collapse-title">
          <div className="w-16 h-4 bg-base-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="collapse-content">
          <span className="text-sm">
            <div className="w-32 h-3 bg-base-200 animate-pulse mt-1 animate-bg"></div>
          </span>
        </div>
      </div>

      <div className="card-actions w-full mt-4">
        <div className="w-full flex gap-2 justify-end">
          <div className="badge bg-base gap-2 truncate w-16 h-4 bg-base-200 animate-pulse mt-1 animate-bg" />
          <div className="badge bg-base gap-2 truncate w-16 h-4 bg-base-200 animate-pulse mt-1 animate-bg" />
        </div>
      </div>

      <div className="card-actions w-full mt-2">
        <div className="w-full flex gap-2">
          <div className="w-16 h-6 bg-base-200 rounded-lg animate-pulse"></div>
          <div className="w-16 h-6 bg-base-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
