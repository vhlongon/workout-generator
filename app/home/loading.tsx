const HomeLoading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <div className="w-72 max-auto h-6 bg-base-200 animate-pulse rounded-lg" />
      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-full max-w-lg h-[2px] bg-base-200 animate-pulse rounded-lg" />
        <div className="w-60 max-auto h-4 bg-base-200 animate-pulse rounded-lg" />
        <div className="w-full max-w-lg h-[2px] bg-base-200 animate-pulse rounded-lg" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-col-4 gap-4 mx-auto border border-base-200 rounded-2xl p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>
              <div className="collapse collapse-arrow text-base-200 border border-base-200">
                <input type="checkbox" />
                <div className="flex gap-1 items-center collapse-title">
                  <div className="w-24 h-4 bg-base-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="collapse-content">
                  <span className="text-sm">
                    <div className="w-full h-3 bg-base-200 rounded-lg animate-pulse mt-1 animate-bg"></div>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeLoading;
