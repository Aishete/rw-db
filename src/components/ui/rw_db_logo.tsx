import { CircleStackIcon } from "@heroicons/react/24/outline";

export default function AcmeLogo() {
  return (
    <div className={` flex flex-row items-center leading-none text-white`}>
      <CircleStackIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[22px]">RW Database</p>
    </div>
  );
}
