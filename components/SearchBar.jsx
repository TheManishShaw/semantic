import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const query = async (data) => {
    setIsLoading(true);
    const finalUrl = `${url}${data}`;
    const res = await axios.get(finalUrl, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    setData([...res?.data]);
    setIsLoading(false);
  };

  const handleSearch = async (data) => {
    query(data.search);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "semantic") {
      setUrl("https://demo.thesciencepark.dev/get_rcmd?q=");
    }
    if (e.target.value === "naics_semantic") {
      setUrl("https://demo.thesciencepark.dev/get_rcmd2?q=");
    }
  };
  return (
    <div>
      <div className="flex gap-3">
        <form className="w-full" onSubmit={handleSubmit(handleSearch)}>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              {...register("search")}
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search Mockups, Logos..."
              required=""
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5  "
          onChange={(e) => handleChange(e)}
        >
          <option value="semantic">Semantic Search</option>
          <option value="naics_semantic">NAICS Semantic Search</option>
        </select>
      </div>

      {!isLoading ? (
        data && data.map((item, i) => <Card key={i} data={item} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SearchBar;
