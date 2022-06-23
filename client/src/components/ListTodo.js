import React, { Fragment, useEffect, useState } from 'react'

function ListTodo() {
    const [jsonData, setJsonData] = useState([]);

    const getData = async (e) => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const data = await response.json();

            setJsonData(data);

        } catch (error) {
            console.log(error)
        }
    }

    const deleteToDo = async(id) => {
        console.log(id)
        try {
            const deleteToDo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })
            console.log(deleteToDo)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()

    }, [])

    return <Fragment >
        <div className='mx-auto w-50'>
            <h1 className=''>To do</h1>
            <table className='table table-borderless'>
                <tbody>
                    {jsonData.map(items => (
                        <tr key={items.id}>
                            <td>
                                <button type="button" className="btn btn-light"><i className="bi bi-square"></i></button>
                            </td>
                            <td className='text-center' style={{ width: '100%', margin: 'auto', fontSize: '20px' }}>{items.description}</td>
                            <td >
                                <button type="button" className="btn btn-danger" onClick={() => {deleteToDo(items.id); getData();}}><i className="bi bi-trash2-fill"></i></button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>


    </Fragment >
}

export default ListTodo