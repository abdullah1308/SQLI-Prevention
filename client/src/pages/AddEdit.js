import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    contact: "",
};

function AddEdit() {
    const [state, setState] = useState(initialState);

    const { name, email, contact } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Please provide value into each input field");
        } else {
            if (!id) {
                axios
                    .post("http://localhost:3001/api/post", {
                        name,
                        email,
                        contact,
                    })
                    .then(() => {
                        setState({ name: "", email: "", contact: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully");
            } else {
                axios
                    .put(`http://localhost:3001/api/update/${id}`, {
                        name,
                        email,
                        contact,
                    })
                    .then(() => {
                        setState({ name: "", email: "", contact: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
            }

            setTimeout(() => navigate("/data"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name..."
                    autoComplete="off"
                    value={name || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Your Email..."
                    value={email || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor="contact">Contact</label>
                <input
                    type="number"
                    id="contact"
                    autoComplete="off"
                    name="contact"
                    placeholder="Your Contact No..."
                    value={contact || ""}
                    onChange={handleInputChange}
                />
                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/data">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    );
}

export default AddEdit;
