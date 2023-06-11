// https://github.com/masai-course/vikas_suresh_fw21_0583/tree/master/unit-5/sprint-1/evaluation/vikaasc1


import React, { useState, useReducer } from "react";

import { ProjectList } from "./ProjectList";

const initialState = {
  name: "",
  tech_stack: "",
  assigned_to: "",
  status: "pending",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "NAME":
      return { ...state, name: payload };
    case "TECH_STACK":
      return { ...state, tech_stack: payload };
    case "ASSIGNED_TO":
      return { ...state, assigned_to: payload };

    case "STATUS":
      return { ...state, status: payload };
    case "RE":
      return initialState;
    default:
      return state;
  }
};

export const AddProject = () => {
  const [projlist, setprojlist] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setprojlist([...projlist, state]);
    dispatch({ type: "RE" });
  };

  return (
    <div>
      <h1>Add Project</h1>
      <div className="form-wrapper" data-testid="form-wrapper">
        <form data-testid="form-element" onSubmit={handleSubmit}>
          <div className="name-wrapper" data-testid="name-wrapper">
            <label>Project Name</label>
            {/* Add Input box here */}
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={(i) =>
                dispatch({ type: "NAME", payload: i.target.value })
              }
            />
          </div>
          <div className="tech-stack-wrapper" data-testid="tech-stack-wrapper">
            <label>Tech Stack</label>

            <select
              name="tech_stack"
              value={state.tech_stack}
              onChange={(i) =>
                dispatch({ type: "TECH_STACK", payload: i.target.value })
              }
              data-testid="tech-stack-select"
            >
              <option value="react">React</option>
              <option value="node">Node</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div
            className="assigned-to-wrapper"
            data-testid="assigned-to-wrapper"
          >
            <label>Assigned to</label>

            <select
              name="assigned_to"
              value={state.assigned_to}
              onChange={(e) =>
                dispatch({ type: "ASSIGNED_TO", payload: e.target.value })
              }
              data-testid="assigned-to-select"
            >
              <option value="nrupul">Nrupul</option>
              <option value="albert">Albert</option>
              <option value="aman">Aman</option>
            </select>
          </div>
          <div
            className="current-status-wrapper"
            data-testid="current-status-wrapper"
          >
            <label>Current Status</label>

            <input
              type="checkbox"
              name="status"
              checked={state.status === "completed"}
              onChange={(e) =>
                dispatch({
                  type: "STATUS",
                  payload: e.target.checked ? "completed" : "pending",
                })
              }
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <h1 data-testid="no-project-container">No Project Found</h1>

      <h1>Project List</h1>

      <ProjectList projlist={projlist} setprojlist={setprojlist} />
    </div>
  );
};

export { initialState, reducer };
