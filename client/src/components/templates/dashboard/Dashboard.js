import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import { Box } from "@mui/material";
import axios from "axios"
import { Link } from "react-router-dom";

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
        <div>
            <Header />
            <Box bgcolor="#0c0c0f" width={1536} height={509} mt="-20px">

                <Box width="70%" height="50%" bgcolor="#fff" m="auto">
                    <Link to={"/addEdit"}>
                        <button>Add User</button>
                    </Link>
                    <table >
                        <thead style={{ backgroundColor: "green" }}>
                            <tr >
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
                </Box>
            </Box>
            <Footer />
        </div>
    );
}

export default Dashboard;