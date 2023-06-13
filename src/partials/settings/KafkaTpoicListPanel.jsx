import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
// import { rankItem } from '@tanstack/match-sorter-utils'

function KafkaTopicList() {
  const [topics, setTopics] = useState([]);
  
  useEffect(() => {
    const fetchTopics = async () => {
        console.log('Fetching Kafka');
    //   const res = await fetch('/api/topics');  
    //   const data = await res.json();  
      const data = [
       { "name":"topic1","partitions" : "6","offset":"198510092","key":"46460919-a5ad-4f8e-90e0-a1252961e38b" ,"timestamp":"2023-06-03 17:22:10.161"},
       { "name":"topic2","partitions" : "6" ,"offset":"198510092","key":"46460919-a5ad-4f8e-90e0-a1252961e38b","timestamp":"2023-06-03 17:22:10.161"},
       { "name":"topic3","partitions" : "6" ,"offset":"198510092","key":"46460919-a5ad-4f8e-90e0-a1252961e38b","timestamp":"2023-06-03 17:22:10.161"}
      ]
      console.log(data);
      setTopics(data);
    }
    fetchTopics();  
  }, [])

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })
  
  
  return (
    <div className='grow'>
        <div className="p-6 space-y-6">
            <h2 className="text-2xl text-slate-800 font-bold mb-5">Kafka Topics</h2>

                  {/* Right side */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                {/* <DeleteButton selectedItems={selectedItems} /> */}
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton align="right" />
              </div>
  
      {/* {
        topics.map(topic => (
          <div key={topic.name}>
            {topic.name} - {topic.partitions} Partitions
          </div>   
        ))
      } */}

<div className="bg-white  rounded-sm border border-slate-200 relative w-full">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All Topics <span className="pl-3 text-slate-400 font-medium">{topics.length}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
      
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox"  />
                    </label>
                  </div>
                </th> */}

                <th className="px-20 first:pl-10 last:pr-1 py-2 whitespace-nowrap w-px">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                  <div className="font-semibold text-left">partitions</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">offset</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">key</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">timestamp</div>
                </th>
                <th className="px-5 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                  <div className="font-semibold text-left">operations</div>
                </th>

                {/* 
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Orders</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Last order</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total spent</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Refunds</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                topics.map(topic => (
                    <tr>
                    {/* <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                      <div className="flex items-center">
                        <label className="inline-flex">
                          <span className="sr-only">Select</span>
                          <input id={topic.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
                        </label>
                      </div>
                    </td> */}
                    <td className="px-20 first:pl-10 last:pr-1 py-2 whitespace-nowrap w-px">
                       <div className="text-left">{topic.name}</div>
                    </td>
                    <td className="px-5 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                       <div className="text-left">{topic.partitions}</div>
                    </td>
                    <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                       <div className="text-left">{topic.offset}</div>
                    </td>
                    <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                       <div className="text-left">{topic.key}</div>
                    </td>
                    <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                       <div className="text-left">{topic.timestamp}</div>
                    </td>
                    <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                       <div className="text-left">

                       {/* <EditMenu align="right" className="relative inline-flex shrink-0">
                        <li>
                          <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">
                            Option 1
                          </Link>
                        </li>
                        <li>
                          <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">
                            Option 2
                          </Link>
                        </li>
                        <li>
                          <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                            Remove
                          </Link>
                        </li>
                      </EditMenu> */}

                      <div className="space-x-1">
                                <button className="text-slate-400 hover:text-slate-500 rounded-full">
                                  <span className="sr-only">Edit</span>
                                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                      <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                                  </svg>
                                </button>                        
                                <button className="text-rose-500 hover:text-rose-600 rounded-full">
                                  <span className="sr-only">Delete</span>
                                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                      <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                      <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                  </svg>
                                </button>
                              </div>

                       </div>
                    </td>
                    </tr>
                    // <div key={topic.name}>
                    //   {topic.name} - {topic.partitions} Partitions
                    // </div>   
                  ))

                // list.map(customer => {
                //   return (
                    // <Customer
                    //   key={customer.id}
                    //   id={customer.id}
                    //   image={customer.image}
                    //   name={customer.name}
                    //   email={customer.email}
                    //   location={customer.location}
                    //   orders={customer.orders}
                    //   lastOrder={customer.lastOrder}
                    //   spent={customer.spent}
                    //   refunds={customer.refunds}
                    //   fav={customer.fav}
                    //   handleClick={handleClick}
                    //   isChecked={isCheck.includes(customer.id)}
                    // />
                //   )
                // })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>

      </div>

    </div>
  )
}

export default KafkaTopicList;