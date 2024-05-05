import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <>
      <div className="bg-white w-full md:w-auto p-2 rounded-full transition cursor-pointer border border-rose-300">
        <div className="flex flex-row items-center justify-between text-sm">
          <input
            type="text"
            className="outline-none rounded-full p-1 px-5 w-full"
          />

          <div className="p-2 rounded-full text-white bg-rose-300 border border-rose-300 hover:bg-rose-500 transition">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
