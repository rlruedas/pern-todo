import React, { Fragment, useEffect, useState } from 'react'

function ListTodo() {
    const [taskIsDone, setTaskIsDone] = useState([]);
    const [taskIsNotDone, setTaskIsNotDone] = useState([]);

    const getData = async (e) => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const data = await response.json();
            const filterNotDone = data.filter((e) => !e.isdone)
            const filterDone = data.filter((e) => e.isdone)

            setTaskIsDone(filterDone);
            setTaskIsNotDone(filterNotDone);

        } catch (error) {
            console.log(error)
        }
    }

    const deleteToDo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })

        } catch (error) {
            console.log(error)
        }
    }

    const updateToDo = async (todo) => {
        let { id, description, isdone } = todo;
        try {
            isdone = !isdone;
            const body = { description, isdone }
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location.reload(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()

    }, [])



    return <Fragment >
        <div className='mx-auto w-50'>
            <h1 className=''>Tasks</h1>
            {taskIsNotDone.length > 0 ? (
                <table className='table table-borderless'>
                    <tbody>
                        {taskIsNotDone.map(items => (
                            <tr key={items.id}>
                                <td>
                                    <button type="button" className="btn btn-light" onClick={() => updateToDo(items)} ><i className="bi bi-square"></i></button>
                                </td>
                                <td className='text-center' style={{ width: '100%', margin: 'auto', fontSize: '20px' }}>{items.description}</td>
                                <td >
                                    <button type="button" className="btn btn-danger" onClick={() => { deleteToDo(items.id); window.location.reload(true); }}><i className="bi bi-trash2-fill"></i></button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            ) : <></>}
            <h1 className=''>Completed Tasks</h1>
            {taskIsDone.length > 0 ? (
                <table className='table table-borderless'>
                    <tbody>
                        {taskIsDone.map(items => (
                            <tr key={items.id}>
                                <td>
                                    <button disabled type="button" className="btn btn-primary" onClick={() => updateToDo(items)} ><i class="bi bi-check-square"></i></button>
                                </td>
                                <td className='text-center' style={{ width: '100%', margin: 'auto', fontSize: '20px' }}><del>{items.description}</del></td>
                                <td >
                                    <button type="button" className="btn btn-danger" onClick={() => { deleteToDo(items.id); window.location.reload(true); }}><i className="bi bi-trash2-fill"></i></button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            ) : <></>}


        </div>
    </Fragment >
}

export default ListTodo