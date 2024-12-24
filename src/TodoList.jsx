import React, { useState } from "react";

function ToDolist() {
  const [tasks, setTasks] = useState([]); // [{}, {}, ...]
  const [newTask, setNewTasks] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [status, setStatus] = useState("All");
  const [editingIndex, setEditingIndex] = useState(null); // Track index of the task being edited
  const [editingTask, setEditingTask] = useState(""); // Updated task name
  const [editingDescription, setEditingDescription] = useState(""); // Updated description

  // Edit Task function
  function editTask(index) {
    const taskToEdit = tasks[index];
    setEditingIndex(index);
    setEditingTask(taskToEdit.task);
    setEditingDescription(taskToEdit.description);
  }

  // Save the edited task
  function saveTask() {
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex
        ? { ...task, task: editingTask, description: editingDescription }
        : task
    );
    setTasks(updatedTasks);
    cancelEdit(); // Cancel after saving
  }

  // Cancel the edit
  function cancelEdit() {
    setEditingIndex(null);
    setEditingTask("");
    setEditingDescription("");
  }

  // Update the status filter
  function statusFilter(newStatus) {
    setStatus(newStatus);
  }

  // Update the status of a task
  function currentStatus(val, item) {
    const updatedTasks = tasks.map((task) =>
      task === item ? { ...task, completed: val === "Completed" } : task
    );
    setTasks(updatedTasks);
  }

  // Filter tasks based on the selected status
  const filteredTasks = tasks.filter((task) => {
    if (status === "All") return true;
    if (status === "Completed") return task.completed;
    if (status === "Not Completed") return !task.completed;
  });

  // Handle changes in the new task input
  function handleTaskChange(event) {
    setNewTasks(event.target.value);
  }

  // Handle changes in the new description input
  function handleDescriptionChange(event) {
    setNewDescription(event.target.value);
  }

  // Add a new task
  function addTask() {
    if (newTask.trim() !== "") {
      const newEntry = {
        task: newTask,
        description: newDescription,
        completed: false,
      };
      setTasks([...tasks, newEntry]);
      setNewTasks("");
      setNewDescription("");
    } else {
      alert("Please enter the task name.");
    }
  }

  // Delete a task
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <div className="container text-center">
      <h1>My Todo</h1>
      <div className="row d-flex justify-content-center align-items-center mb-5">
        <div className="col-12 col-md-7 col-lg-4">
          <input
            type="text"
            placeholder="Todo Name"
            value={newTask}
            className="initialName"
            onChange={handleTaskChange}
          />
        </div>
        <div className="col-12 col-md-7 col-lg-4">
          <input
            type="text"
            placeholder="Todo Description"
            className="initialDescription"
            value={newDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="col-12 col-md-7 col-lg-2">
          <button className="btn btn-primary" onClick={addTask}>
            Add Todo
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8 d-flex justify-content-start">
          <p className="mytodos">My Todos</p>
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label status">Status Filter :</label>
          <select
            name="status"
            id="options"
            onChange={(e) => statusFilter(e.target.value)}
            value={status}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredTasks.map((item, index) => (
          <div key={index} className="card col-12 col-md-6 col-lg-4">
            <div className="card-body ">
              {editingIndex === index ? (
                // Edit View
                <>
                  <label htmlFor="taskName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="taskName"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    placeholder="Task Name"
                  />
                  <label htmlFor="taskDescription" className="form-label ">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="taskDescription"
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    placeholder="Task Description"
                  />
                  <div className="d-flex gap-2 mt-5">
                    <button className="btn btn-secondary" onClick={saveTask}>
                      Save
                    </button>
                    <button className="btn btn-danger" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // Display View
                <>
                  <h5 className="card-title text-start">Name: {item.task}</h5>
                  <p className="card-text text-start">
                    Description: {item.description}
                  </p>
                  <div className="row">
                    <div className="col-3">
                      <label className="form-label me-2">Status</label>
                    </div>
                    <div className="col">
                      <select
                        name="status"
                        id="options"
                        value={item.completed ? "Completed" : "Not Completed"}
                        className="form-select"
                        onChange={(e) => currentStatus(e.target.value, item)}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Not Completed">Not Completed</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            {editingIndex !== index && (
              <div className="card-footer mt-3 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => editTask(index)} // Trigger editing of the task
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(index)} // Delete the task
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDolist;
