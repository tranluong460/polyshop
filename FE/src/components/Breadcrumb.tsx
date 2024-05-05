import { GoHome } from "react-icons/go";
import { AiOutlineRight } from "react-icons/ai";

type BreadcrumbProps = {
  text: string;
};

const Breadcrumb = ({ text }: BreadcrumbProps) => {
  return (
    <>
      <div className="px-10 p-5 flex items-center gap-1 bg-white w-full rounded-xl">
        <GoHome className="text-rose-400 text-base" size={20} />

        <span className="text-sm text-gray-400">
          <AiOutlineRight />
        </span>

        <p className="text-gray-600 font-semibold text-lg">{text}</p>
      </div>
    </>
  );
};

export default Breadcrumb;
