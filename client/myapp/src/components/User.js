import React, { Fragment, useState } from "react";
import axios from "axios";
import "./User.css";
import DisplayUser from "./DisplayUser/DisplayUser";
import Spinner from "react-bootstrap/Spinner";

const User = () => {
  /*const getData = async () => {
    const { data } = await axios.get(`http://localhost:3008/api/users/all`);
  };

  //useEffect(() => {}, []);

  const [formData, setFormData] = useState({
    nameInput: "",
    emailInput: "",
    genderInput: "",
    statusInput: "",
  });*/

  const [Buttons, showButtons] = useState(1);
  const [key, setKey] = useState(1);
  const [data, setData] = useState([]);
  const [uniqueUserData, setUniqueUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    imageUrl: "",
    status: "",
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  const [actionButtonClicked, setActionButtonClicked] = useState(true);
  const [valid, setValid] = useState(true);

  const getAllDetails = async () => {
    const { data } = await axios.get(`http://localhost:3008/api/users/all`);
    setData(data);
    setUniqueUserData([]);
  };

  const onBack = () => {
    showButtons(1);
    setData([]);
    setUniqueUserData([]);
    setUserId("");
    setActionButtonClicked(true);
    setFormData({
      id: "",
      name: "",
      email: "",
      gender: "",
      imageUrl: "",
      status: "",
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    setValid(true);
  };
  const setKeyValue = (val) => {
    showButtons(0);
    setKey(val);
  };
  const getUserDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:3008/api/users/${userId}`
    );
    if (data.length === 0) {
      console.log("in valid");
      setValid(false);
    } else {
      console.log(data[0], "recived successfully in getUserDetails");
      setFormData({
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        gender: data[0].gender,
        imageUrl: data[0].imageUrl,
        status: data[0].status,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      setUniqueUserData(data);
      setValid(true);
    }
    setData([]);
    setActionButtonClicked(false);
  };

  const updateUserDetails = async (event) => {
    event.preventDefault();
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
      "Content-Type": "application/json",
    };
    if (valid) {
      console.log(formData,"update route")
      const { data } = await axios.put(
        `http://localhost:3008/api/users/update/${userId}`,
        formData,
        {headers}
      );
      setUniqueUserData(data);
      setActionButtonClicked(true);
    }
    console.log("updateUserDetails");
  };

  const addNewUser = async (event) => {
    event.preventDefault();
    console.log("addNewUser");
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
      "Content-Type": "application/json",
    };
    if (formData.imageUrl === "") {
      let x = formData;
      delete x["imageUrl"];
      const { data } = await axios.post(
        `http://localhost:3008/api/users/add`,
        x,
        { headers }
      );
      console.log(data);
    } else {
      const { data } = await axios.post(
        `http://localhost:3008/api/users/add/`,
        formData,
        { headers }
      );
      console.log(data);
    }
    setActionButtonClicked(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const deleteUser = async () => {
    const { data } = await axios.get(
      `http://localhost:3008/api/users/${userId}`
    );
    console.log(data.length, "delete");
    if (data.length === 0) {
      setActionButtonClicked(false);
      setValid(false);
    } else {
      await axios.delete(`http://localhost:3008/api/users/${userId}`);
      setActionButtonClicked(false);
      setValid(true);
    }
  };
  const onChangeUserId = (event) => {
    setUniqueUserData([]);
    setUserId(event.target.value);
  };

  return (
    <Fragment>
      <div className="bg-conatiner">
        {Buttons === 1 ? (
          <div className="options">
            <h1 className="heading">USER DETAILS</h1>
            <br />
            <button
              type="button"
              className="btn btn-primary btn-block btn-large"
              onClick={() => {
                setKeyValue(1);
              }}
            >
              Get All Details
            </button>
            <br />
            <button
              type="button"
              className="btn btn-primary btn-block btn-large"
              onClick={() => {
                setKeyValue(2);
              }}
            >
              Get User Details
            </button>
            <br />
            <button
              type="button"
              className="btn btn-primary btn-block btn-large"
              onClick={() => {
                setKeyValue(3);
              }}
            >
              Update Details
            </button>
            <br />
            <button
              type="button"
              className="btn btn-primary btn-block btn-large"
              onClick={() => {
                setKeyValue(4);
              }}
            >
              Add New user
            </button>
            <br />
            <button
              type="button"
              className="btn btn-primary btn-block btn-large"
              onClick={() => {
                setKeyValue(5);
              }}
            >
              Delete User
            </button>
          </div>
        ) : (
          <div className="resultsDiv">
            {(() => {
              switch (key) {
                case 1:
                  if (data.length === 0) {
                    getAllDetails();
                  } else {
                    return data.map((eachUser) => (
                      <DisplayUser key={eachUser.id} userDetails={eachUser} />
                    ));
                  }
                  return (
                    <div className="spinnerElement">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden loading">
                          Loading...
                        </span>
                      </Spinner>
                    </div>
                  );
                case 2:
                  console.log(uniqueUserData);
                  if (uniqueUserData.length === 0) {
                    return !actionButtonClicked ? (
                      <h1>
                        <span className="noResults">No results Found</span>
                      </h1>
                    ) : (
                      <div>
                        <h1 className="labelCss">Enter User Id</h1>
                        <input
                          className="inputTag"
                          type="text"
                          name="userId"
                          onChange={onChangeUserId}
                          value={userId}
                        />
                        <button
                          type="submit"
                          className="btn btn-dark backbutton"
                          onClick={getUserDetails}
                        >
                          Get Details
                        </button>
                      </div>
                    );
                  } else {
                    return uniqueUserData.map((eachUser) => (
                      <DisplayUser key={eachUser.id} userDetails={eachUser} />
                    ));
                  }

                case 3:
                  if (uniqueUserData.length === 0 && valid) {
                    return (
                      <div>
                        <h1 className="labelCss">Enter User Id</h1>
                        <input
                          className="inputTag"
                          type="text"
                          name="UserId"
                          onChange={onChangeUserId}
                          value={userId}
                        />
                        <button
                          type="submit"
                          className="btn btn-dark backbutton"
                          onClick={getUserDetails}
                        >
                          Get Details
                        </button>
                      </div>
                    );
                  } else {
                    return valid ? !actionButtonClicked?(
                      <div className="addFormContainer">
                        <h1 className="addHeading">Enter Details</h1>
                        <form id="addForm" onSubmit={updateUserDetails}>
                          <div className="formContainer">
                            <div className="eachInputDiv">
                              <label
                                htmlFor="uId"
                                className="formLabel"
                                style={{ marginRight: "10px" }}
                              >
                                Enter User Id :{" "}
                              </label>
                              <input
                                className="inputTag addUserInput"
                                type="text"
                                name="id"
                                placeholder="eg:0001"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.id}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label htmlFor="name" className="formLabel">
                                Enter User Name :{" "}
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="inputTag addUserInput"
                                placeholder="eg:venkat"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.name}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label htmlFor="email" className="formLabel">
                                Enter User Email :{" "}
                              </label>
                              <input
                                type="text"
                                name="email"
                                className="inputTag addUserInput"
                                placeholder="eg:venkat@gmail.com"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.email}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label htmlFor="imageUrl" className="formLabel">
                                Enter User ImageUrl :{" "}
                              </label>
                              <input
                                type="text"
                                name="imageUrl"
                                className="inputTag addUserInput"
                                placeholder="eg:https://example.com"
                                onChange={handleInputChange}
                                value={formData.imageUrl}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label
                                className="formLabel"
                                style={{ minWidth: "25%" }}
                              >
                                Gender :{" "}
                              </label>
                              <div
                                className="genderContainer"
                                style={{ minWidth: "35%" }}
                              >
                                <input
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  id="male"
                                  checked={formData.gender==="male"}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="male" className="formLabel">
                                  Male
                                </label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  id="female"
                                  checked={formData.gender==="female"}
                                  onChange={handleInputChange}
                                  style={{ marginLeft: "20px" }}
                                />
                                <label htmlFor="female" className="formLabel">
                                  Female
                                </label>
                              </div>
                            </div>
                            <div className="eachInputDiv">
                              <label
                                className="formLabel"
                                style={{ minWidth: "29%" }}
                              >
                                Status :{" "}
                              </label>
                              <div
                                className="StatusContainer"
                                style={{ minWidth: "49%" }}
                              >
                                <input
                                  type="radio"
                                  name="status"
                                  value="active"
                                  id="active"
                                  checked={formData.status==="active"}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="active" className="formLabel">
                                  Active
                                </label>
                                <input
                                  type="radio"
                                  name="status"
                                  value="inactive"
                                  id="inactive"
                                  checked={formData.status==="inactive"}
                                  onChange={handleInputChange}
                                  style={{ marginLeft: "20px" }}
                                />
                                <label htmlFor="inactive" className="formLabel">
                                  Inactive
                                </label>
                              </div>
                            </div>
                          </div>
                          <br />
                          <button
                            type="submit"
                            className="btn btn-dark backbutton"
                          >
                            UPDATE USER
                          </button>
                        </form>
                      </div>
                    ): <h1 className="succesAdd">Updated Successfully</h1>: (
                      <h1 className="noResults">User Not Found</h1>
                    );
                  }
                case 4:
                  if (actionButtonClicked) {
                    return (
                      <div className="addFormContainer">
                        <h1 className="addHeading">Enter Details</h1>
                        <form id="addForm" onSubmit={addNewUser}>
                          <div className="formContainer">
                            <div className="eachInputDiv">
                              <label
                                htmlFor="uId"
                                className="formLabel"
                                style={{ marginRight: "10px" }}
                              >
                                Enter User Id :{" "}
                              </label>
                              <input
                                className="inputTag addUserInput"
                                type="text"
                                name="id"
                                placeholder="eg:0001"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.id}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label htmlFor="name" className="formLabel">
                                Enter User Name :{" "}
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="inputTag addUserInput"
                                placeholder="eg:venkat"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.name}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label htmlFor="email" className="formLabel">
                                Enter User Email :{" "}
                              </label>
                              <input
                                type="text"
                                name="email"
                                className="inputTag addUserInput"
                                placeholder="eg:venkat@gmail.com"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.email}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label htmlFor="imageUrl" className="formLabel">
                                Enter User ImageUrl :{" "}
                              </label>
                              <input
                                type="text"
                                name="imageUrl"
                                className="inputTag addUserInput"
                                placeholder="eg:https://example.com"
                                onChange={handleInputChange}
                                value={formData.imageUrl}
                              />
                            </div>
                            <div className="eachInputDiv">
                              <label
                                className="formLabel"
                                style={{ minWidth: "25%" }}
                              >
                                Gender :{" "}
                              </label>
                              <div
                                className="genderContainer"
                                style={{ minWidth: "35%" }}
                              >
                                <input
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  id="male"
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="male" className="formLabel">
                                  Male
                                </label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  id="female"
                                  onChange={handleInputChange}
                                  style={{ marginLeft: "20px" }}
                                />
                                <label htmlFor="female" className="formLabel">
                                  Female
                                </label>
                              </div>
                            </div>
                            <div className="eachInputDiv">
                              <label
                                className="formLabel"
                                style={{ minWidth: "29%" }}
                              >
                                Status :{" "}
                              </label>
                              <div
                                className="StatusContainer"
                                style={{ minWidth: "49%" }}
                              >
                                <input
                                  type="radio"
                                  name="status"
                                  value="active"
                                  id="active"
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="active" className="formLabel">
                                  Active
                                </label>
                                <input
                                  type="radio"
                                  name="status"
                                  value="inactive"
                                  id="inactive"
                                  onChange={handleInputChange}
                                  style={{ marginLeft: "20px" }}
                                />
                                <label htmlFor="inactive" className="formLabel">
                                  Inactive
                                </label>
                              </div>
                            </div>
                          </div>
                          <br />
                          <button
                            type="submit"
                            className="btn btn-dark backbutton"
                          >
                            Add User
                          </button>
                        </form>
                      </div>
                    );
                  } else {
                    return (
                      <h1>
                        <span className="succesAdd">Added Successfully</span>
                      </h1>
                    );
                  }
                case 5:
                  if (actionButtonClicked) {
                    return (
                      <div>
                        <h1 className="labelCss">Enter User Id</h1>
                        <input
                          type="text"
                          className="inputTag"
                          name="userId"
                          onChange={onChangeUserId}
                          value={userId}
                        />
                        <button
                          type="button"
                          className="btn btn-dark backbutton"
                          onClick={deleteUser}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  } else {
                    return valid ? (
                      <h1 className="deleteUserText">
                        User with id : {userId} Deleted
                      </h1>
                    ) : (
                      <h1>
                        <span className="noResults">User Not Found</span>
                      </h1>
                    );
                  }
                default:
                  return <h1 className="heading1">Invalid Option</h1>;
              }
            })()}
            <br />
            <div className="backDiv">
              <button
                type="button"
                className="btn btn-dark backbutton"
                onClick={onBack}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default User;
