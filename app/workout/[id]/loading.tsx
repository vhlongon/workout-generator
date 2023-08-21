const WorkoutLoading = () => {
  return (
    <div className="max-w-[400px] w-full mx-auto flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto flex flex-col justify-items-center gap-6">
        <div className="w-full flex justify-center">
          <div className="w-64 max-auto h-6 bg-base-200 animate-pulse rounded-lg" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-16 max-auto h-4 bg-base-200 animate-pulse rounded-lg" />
          <div className="w-full h-6 bg-base-200 animate-pulse rounded-lg " />
        </div>

        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full flex justify-between border-b border-base-200 p-4 gap-4"
            >
              <div className="flex-1 h-6 bg-base-200 animate-pulse rounded-lg " />
              <div className="w-16 h-6 bg-base-200 animate-pulse rounded-lg " />
              <div className="w-16 h-6 bg-base-200 animate-pulse rounded-lg " />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="w-24 h-6 bg-base-200 animate-pulse rounded-lg " />
          <div className="w-24 h-6 bg-base-200 animate-pulse rounded-lg " />
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-16 max-auto h-4 bg-base-200 animate-pulse rounded-lg" />
          <div className="w-full h-24 bg-base-200 animate-pulse rounded-lg " />
        </div>

        <div className="w-full flex justify-center">
          <div className="w-36 max-auto h-10 bg-base-200 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default WorkoutLoading;
