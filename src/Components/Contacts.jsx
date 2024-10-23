import React from 'react';
import { FaPen, FaUserPlus, FaFilter } from 'react-icons/fa6';
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";

function Contacts() {
  return (
    <>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">

            <h1 className='text-xl font-bold'>Pig Farming</h1>
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="flex flex-wrap items-center justify-between pb-4">
                    <div className="flex space-x-4 items-center">
                        <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                        />
                        </div>
                        <button className="flex items-center space-x-1">
                        <FaFilter /> <span>Filter</span>
                        </button>
                    </div>

                    <div className="flex space-x-4">
                        <button className="flex items-center space-x-1">
                        <TiUpload /> <span>Upload</span> 
                        </button>
                        <button className="flex items-center space-x-1">
                        <FaUserPlus /> <span>Add New</span>
                        </button>
                    </div>
                </div>


                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tags
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img class="w-10 h-10 rounded-full" src="../../public/logo.webp" alt="Jese image"/>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">Thomas Lean</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                thomaslean@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                (254)7-123-125-398
                            </td>
                            <td className="px-6 py-4">
                                Farm Manager
                            </td>
                            <td className="px-6 py-4 flex space-x-2 items-center">
                                <RiDeleteBin5Line className='text-red-600 text-base'/>
                                <FaPen className='text-green-600 text-base' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        </div>
    </>
  )
}

export default Contacts