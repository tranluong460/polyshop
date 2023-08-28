import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updateSearchTerm } from "../../../api/sliceSearch";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [text, setText] = useState('')
  const navi = useNavigate()
  const dispath = useDispatch()
  const handleSearch = () => {
    dispath(updateSearchTerm(text));
    navi(`/product/${text}`)

  };

  return (
    <>
      <div className="bg-white w-full md:w-auto p-2 rounded-full transition cursor-pointer border border-rose-300">
        <div className="flex flex-row items-center justify-between text-sm">
          <input
            type="text"
            className="outline-none rounded-full p-1 px-5 w-full"
            onChange={(value: any) => setText(value.target.value)}
          />

          <div onClick={() => handleSearch()} className="p-2 rounded-full text-white bg-rose-300 border border-rose-300 hover:bg-rose-500 transition">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
