import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useParams } from 'react-router';
function Meetings(props) {
  const params = useParams();
  const initialMeetings = localStorage.getItem("meetings")
    ? JSON.parse(localStorage.getItem("meetings"))
    : [];
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDesc] = useState("");
  const [meetingList, setMeetingList] = useState(initialMeetings);
  const [updatingID, setUpdatingID] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (updatingID === null) {
      setMeetingList([
        ...meetingList,
        {
          id: meetingList.length + 1,
          title: title,
          description: description,
          start: start,
          end: end,
          userId: params.id
        },
      ]);
    } else {
      setMeetingList([
        ...meetingList.map((m) => {
          if (updatingID === m.id) {
            return {
              id: updatingID,
              title: title,
              description: description,
              start: start,
              end: end,
              userId: params.id
            };
          }
          return m;
        }),
      ]);

      setUpdatingID(null);
    }
    resetForm();
  };

  const resetForm = () => {
    setDesc("");
    setTitle("");
    setEnd("");
    setStart("");
  };

  const closeModal = () => {
    $("#myModal").show(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const meeting = meetingList.find((m) => m.id === id);
    setDesc(meeting.description);
    setTitle(meeting.title);
    setEnd(meeting.end);
    setStart(meeting.start);
    setUpdatingID(meeting.id);
  };

  const handleDelete = (id) => {
    setMeetingList(meetingList.filter((m) => m.id !== id));
  };

  const navigate = useNavigate();

  useEffect(() => {
    debugger
    localStorage.setItem("meetings", JSON.stringify(meetingList));
  }, [meetingList]);

  return (
    <>
      <div class="container">
        <h2
          style={{
            alignItems: "center",
            marginLeft: "500px",
            marginBottom: "50px",
          }}
        >
          Meetings
        </h2>
        <div>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            style={{ marginLeft: "1030px", marginTop: "-60px" }}
          >
            Add New
          </button>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {meetingList.filter(p=> p.userId == params.id).map((meeting, index) => {
              return (
                <tr key={index}>
                  <td>{meeting.id}</td>
                  <td>{meeting.title}</td>
                  <td>{meeting.description}</td>
                  <td>{meeting.start}</td>
                  <td>{meeting.end}</td>
                  <td>
                    <span>
                      <button
                        type="button"
                        className="btn btn-warning"
                        style={{ marginRight: "10px" }}
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => {
                          handleEdit(meeting.id);
                        }}
                      >
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(meeting.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={(e) => closeModal()}
              >
                &times;
              </button>
              <h4 class="modal-title">Meetings</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="email">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="email">Start:</label>
                <input
                  type="date"
                  className="form-control"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="email">End:</label>
                <input
                  type="date"
                  className="form-control"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="email">Title:</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-info"
                data-dismiss="modal"
                onClick={(e) => submit(e)}
              >
                {updatingID !== null ? "Edit" : "Create"}
              </button>
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Meetings;
