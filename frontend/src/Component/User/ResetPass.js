import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword, clearAuthError } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  let dispatch = useDispatch();
  let nav = useNavigate();

  let { token } = useParams();

  const { error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("password", password);
    formData.append("confirmPassword", confirmpassword);

    dispatch(ResetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Password Reset successfully!", {
        position: "bottom-center",
      });

      nav("/home");

      return;
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, dispatch, isAuthenticated,nav]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}
