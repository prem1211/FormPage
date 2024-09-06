import React, { useState } from "react";
import "../components/FormPage.css";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const FormPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Prem kumar",
      email: "prem@example.com",
      age: 25,
      gender: "male",
      address: "Golden City",
      country: "India",
      state: "TN",
      city: "Coimbatore",
      mobile: "9876543210",
      checkbox: true,
    },
  ]);

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    age: null,
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
    checkbox: false,
  });

  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const countryOptions = [
    { label: "India", value: "india" },
    { label: "Canada", value: "canada" },
    { label: "USA", value: "usa" },
    { label: "Sri Lanka", value: "sl" },
  ];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target || e;
    setFormInput({
      ...formInput,
      [id]: type === "checkbox" ? checked : value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]:
        type === "checkbox"
          ? checked
            ? ""
            : prevErrors[id]
          : value && typeof value === "string" && value.trim() !== ""
          ? ""
          : prevErrors[id],
    }));
  };

  const handleDropdownChange = (id, value) => {
    setFormInput({
      ...formInput,
      [id]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value ? "" : prevErrors[id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      { key: "name", message: "Name is required" },
      { key: "email", message: "Email is required" },
      { key: "age", message: "Age is required" },
      { key: "gender", message: "Gender is required" },
      { key: "address", message: "Address is required" },
      { key: "country", message: "Country is required" },
      { key: "state", message: "State is required" },
      { key: "city", message: "City is required" },
      { key: "mobile", message: "Mobile number is required" },
      { key: "checkbox", message: "You must accept the terms & conditions" },
    ];

    const agePattern = /^[1-9]\d*$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    requiredFields.forEach(({ key, message }) => {
      const value = formInput[key];

      if (key === "checkbox" && !value) {
        newErrors[key] = message;
      } else if (typeof value === "string" && !value.trim()) {
        newErrors[key] = message;
      } else if (
        key === "age" &&
        (!value || !agePattern.test(value) || value < 18 || value > 100)
      ) {
        newErrors[key] = "Please enter a valid age between 18 and 100";
      } else if (key === "mobile" && (!value || !mobilePattern.test(value))) {
        newErrors[key] = "Please enter a valid 10-digit mobile number";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (editing) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingId ? { ...user, ...formInput } : user
          )
        );
        setEditing(false);
        setEditingId(null);
      } else {
        const newUser = {
          id: users.length + 1,
          ...formInput,
        };
        setUsers([...users, newUser]);
      }
      setFormInput({
        name: "",
        email: "",
        age: null,
        gender: "",
        address: "",
        country: "",
        state: "",
        city: "",
        mobile: "",
        checkbox: false,
      });
    }
  };

  const handleEdit = (data) => {
    setFormInput(data);
    setEditing(true);
    setEditingId(data.id);
  };

  const handleDelete = (data) => {
    setUsers(users.filter((user) => user.id !== data.id));
  };

  return (
    <div className="bg-gray-300 p-fluid flex align-items-center justify-content-center">
      <div className="form-container bg-white p-3 border-round shadow-2 w-full md:w-11 lg:w-8">
        <h1 className="text-xl font-bold mb-4 text-center">Form Page</h1>
        <div className="grid grid-nogutter">
          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={formInput.name}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your name"
            />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="email"
              value={formInput.email}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your email"
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="age">Age</label>
            <InputNumber
              id="age"
              value={formInput.age}
              onValueChange={(e) =>
                handleChange({ target: { id: "age", value: e.value } })
              }
              className="w-full"
              placeholder="Enter your age"
            />
            {errors.age && <small className="p-error">{errors.age}</small>}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label>Gender</label>
            <div className="gender-options flex justify-content-start gap-3 mt-2">
              {genderOptions.map((option) => (
                <div key={option.value} className="p-field-radiobutton">
                  <RadioButton
                    inputId={option.value}
                    name="gender"
                    value={option.value}
                    onChange={(e) =>
                      handleChange({ target: { id: "gender", value: e.value } })
                    }
                    checked={formInput.gender === option.value}
                  />
                  <label className="p-2" htmlFor={option.value}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.gender && (
              <small className="p-error">{errors.gender}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="address">Address</label>
            <InputTextarea
              id="address"
              value={formInput.address}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your address"
            />
            {errors.address && (
              <small className="p-error">{errors.address}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="mobile">Mobile Number</label>
            <InputText
              id="mobile"
              value={formInput.mobile}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <small className="p-error">{errors.mobile}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="country">Country</label>
            <Dropdown
              id="country"
              options={countryOptions}
              value={formInput.country}
              onChange={(e) => handleDropdownChange("country", e.value)}
              className="w-full"
              placeholder="Select Country"
            />
            {errors.country && (
              <small className="p-error">{errors.country}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="state">State</label>
            <InputText
              id="state"
              value={formInput.state}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your state"
            />
            {errors.state && <small className="p-error">{errors.state}</small>}
          </div>

          <div className="field col-12 md:col-6 m-3">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              value={formInput.city}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your city"
            />
            {errors.city && <small className="p-error">{errors.city}</small>}
          </div>

          <div className="field-checkbox col-12 md:col-6 m-3">
            <Checkbox
              id="checkbox"
              checked={formInput.checkbox}
              onChange={handleChange}
            />
            <label htmlFor="checkbox" className="p-checkbox-label">
              Accept Terms & Conditions
            </label>
            {errors.checkbox && (
              <small className="p-error">{errors.checkbox}</small>
            )}
          </div>
        </div>

        <div className="col-12 flex justify-content-center">
          <Button
            label={editing ? "Update" : "Submit"}
            onClick={handleSubmit}
            className="w-auto mt-2 p-button-success"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-center">Details List</h2>
          <DataTable value={users} className="mt-4">
            <Column field="name" header="Name" style={{ minWidth: "150px" }} />
            <Column
              field="email"
              header="Email"
              style={{ minWidth: "200px" }}
            />
            <Column field="age" header="Age" style={{ minWidth: "100px" }} />
            <Column
              field="gender"
              header="Gender"
              style={{ minWidth: "100px" }}
            />
            <Column
              field="address"
              header="Address"
              style={{ minWidth: "250px" }}
            />
            <Column
              field="country"
              header="Country"
              style={{ minWidth: "150px" }}
            />
            <Column
              field="state"
              header="State"
              style={{ minWidth: "150px" }}
            />
            <Column field="city" header="City" style={{ minWidth: "150px" }} />
            <Column
              field="mobile"
              header="Mobile"
              style={{ minWidth: "150px" }}
            />

            <Column
              header="Actions"
              body={(data) => (
                <div className="flex gap-2">
                  <Button
                    className="p-button-sm w-8 p-button-primary justify-content-center"
                    onClick={() => handleEdit(data)}
                    style={{ minWidth: "50px" }}>
                    Edit
                  </Button>
                  <Button
                    className="p-button-sm p-button-danger w-8 justify-content-center"
                    onClick={() => handleDelete(data)}
                    style={{ minWidth: "50px" }}>
                    Delete
                  </Button>
                </div>
              )}
              style={{ minWidth: "150px" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
