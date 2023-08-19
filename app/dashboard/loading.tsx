import { Cog6ToothIcon } from '@heroicons/react/24/solid';

const DashboardLoading = () => (
  <div className="w-full flex flex-col items-center justify-items-center justify-center">
    <div className="clip-text text-2xl lg:text-4xl font-bold animate-pulse text-base-300">
      Loading settings...
    </div>
    <div className="relative">
      <Cog6ToothIcon className="w-24 h-24 animate-pulse text-base-200 relative right-8 top-10" />
      <Cog6ToothIcon className="w-32 h-32 animate-pulse text-base-200 relative left-2" />
      <div className="relative">
        <Cog6ToothIcon className="w-24 h-24 animate-pulse text-base-200 relative left-[-2rem] top-[-2.5rem]" />
      </div>
    </div>
  </div>
);

export default DashboardLoading;
