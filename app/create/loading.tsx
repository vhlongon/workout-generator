const CreateLoading = () => {
  return (
    <div className="max-w-[400px] w-full mx-auto flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto flex flex-col justify-items-center gap-8">
        <div className="w-full flex justify-center">
          <div className="w-full mx-4 max-auto h-6 bg-base-200 animate-pulse rounded-lg" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-60 max-auto h-3 bg-base-200 animate-pulse rounded-lg" />
          <div className="w-full h-6 bg-base-200 animate-pulse rounded-lg " />
          <div className="w-full h-3 bg-base-200 animate-pulse rounded-lg" />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-20 h-3 bg-base-200 animate-pulse rounded-lg" />
            <div className="w-28 h-6 bg-base-200 animate-pulse rounded-lg " />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-20 h-3 bg-base-200 animate-pulse rounded-lg" />
            <div className="w-28 h-6 bg-base-200 animate-pulse rounded-lg " />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-20 h-3 bg-base-200 animate-pulse rounded-lg" />
            <div className="w-20 h-6 bg-base-200 animate-pulse rounded-lg " />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-36 max-auto h-10 bg-base-200 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CreateLoading;
