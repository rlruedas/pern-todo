import React, { Fragment, useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("")

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description }
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return <Fragment>
    <h1 className="text-center mt-5">PERN todo</h1>

    <form className="d-flex " onSubmit={onSubmitForm}>
      <div className="mb-3 input-group w-50 mx-auto">
        <input type="text"
          className="form-control" name="" id="" aria-describedby="helpId" placeholder="Add new To Do" onChange={e => setDescription(e.target.value)} />
        <button className="input-group-text btn btn-success">
          <i className="bi bi-plus" style={{width: "50px", height: "50px"}}></i>
        </button>
      </div>
    </form>
  </Fragment >
}

export default InputTodo