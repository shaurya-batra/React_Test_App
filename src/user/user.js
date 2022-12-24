import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { Outlet, Link } from "react-router-dom";
function User() {
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
          Users
        </h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link to="/meetings/1">John</Link>
              </td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <Link to="/meetings/2">Mark</Link>
              </td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default User;
