import React, { useState } from "react";
import Loader from "./Loader";

const Card = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = { ...props };
  console.log(data?.id);

  if (isLoading) return <Loader />;
  if (!data) {
    return (
      <main className="flex flex-col items-center h-[80vh] justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">
          No Challenges <a className="text-gray-600"> Found</a>
        </h1>
      </main>
    );
  }
  return (
    <article className="p-6 my-3 bg-white rounded-lg border border-gray-200 shadow-md ">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
          <svg
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
              clipRule="evenodd"
            ></path>
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
          </svg>
          {data?.uid}
        </span>
        <span className="text-sm">{data?.naics_code}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight cursor-pointer text-gray-900 ">
        <a>{data?.prime_award_base_transaction_description}</a>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {data?.naics_description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {data?.contract_transaction_unique_key}
        </div>
      </div>
    </article>
  );
};

export default Card;
