import React, { useState, useEffect } from "react"

const CRUD = () => {
  const empData = [
    { id: 1, name: "John", age: 29, isActive: 1 },
    { id: 2, name: "Bruno", age: 22, isActive: 1 },
    { id: 3, name: "Diogo", age: 25, isActive: 0 },
  ]

  const [data, setData] = useState([])
  useEffect(() => {
    setData(empData)
  }, [])

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 w-full mx-auto">
        <table className=" w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Active</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{item.id}</td>
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.age}</td>
                  <td className="px-6 py-3">
                    {item.isActive ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 font-medium">No</span>
                    )}
                  </td>
                  <td className="px-6 py-3 space-x-2 justify-center align-middle">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CRUD
