import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import axios from "axios"
import { Link } from "react-router-dom";
import styles from "./style.module.css"
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Dashboard = () => {
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get")
        setData(response.data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const deleteContact = (id) => {
        if (window.confirm("Are you sure u want to delete this user?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            alert("Deleted")
            setTimeout(() => loadData(), 500)
        }
    }

    return (
        <div style={{ backgroundColor: "#16161c" }}>
            <Header />

            <Typography>
                MovieBox Admin Dashboard
            </Typography>
            <div className={styles.table}>
                <Link to={"/Edit"}>
                    <button className={styles.addButton}>Add User</button>
                </Link>
                <table style={{ paddingLeft: "25%" }}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th style={{ textAlign: "center" }}>ID</th>
                            <th style={{ textAlign: "center" }}>Name</th>
                            <th style={{ textAlign: "center" }}>Password</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={item.UserID}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.Username}</td>
                                    <td>{item.Password}</td>
                                    <td>{item.Email}</td>
                                    <td>
                                        <Link to={`/update/${item.UserID}`}>
                                            <button>Edit</button>
                                        </Link>
                                        <button onClick={() => deleteContact(item.UserID)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;