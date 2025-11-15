import React, { useState, useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"

const CRUD = () => {
  const empData = [
    { id: 1, name: "John", age: 29, isActive: 1 },
    { id: 2, name: "Bruno", age: 22, isActive: 1 },
    { id: 3, name: "Diogo", age: 25, isActive: 0 },
  ]

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //For New Record
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [isActive, setIsActive] = useState(0)

  //For Edit Record
  const [editId, setEditId] = useState("")
  const [editName, setEditName] = useState("")
  const [editAge, setEditAge] = useState("")
  const [editIsActive, setEditIsActive] = useState(0)

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7227/api/Employee")
        setData(response.data)
      } catch (error) {
        console.error("There was an error fetching the data!", error)
      }
    }

    fetchData()
  }, [])

  const handleEdit = (id) => {
    //alert(id)
    handleShow()
  }

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this record?") == true
    ) {
      alert(id)
    }
  }

  const handleUpdate = () => {
    alert("Update logic goes here")
  }

  const handleSave = () => {
    const url = "https://localhost:7227/api/Employee"
    const data = {
      name: name,
      age: age,
      isActive: isActive,
    }
    axios.post(url, data).then((response) => {
      console.log("Data saved successfully:", response.data)
      ~getData()
      clear()
    })
  }

  const clear = () => {
    setName("")
    setAge("")
    setIsActive(0)
    setEditName("")
    setEditAge("")
    setEditIsActive(0)
    setEditId("")
  }

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => setIsActive(e)}
              value={isActive}
            ></input>
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 w-full mx-auto">
        <table className=" w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-3">#</th>
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
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              ></input>
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              ></input>
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editIsActive === 1 ? true : false}
                onChange={(e) => setEditIsActive(e)}
                value={editIsActive}
              ></input>
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CRUD
