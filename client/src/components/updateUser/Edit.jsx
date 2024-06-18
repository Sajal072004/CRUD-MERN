import React, { useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'
import "./edit.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Edit = () => {

  const users = {
    fname: "",
    lname: "",
    email: ""
  }

  const { id } = useParams();

  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);

      }).catch(error => {
        console.log(error);
      })

  }, [id])

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success("User Successfully updated", { position: "top-right" });
        navigate("/");
      }).catch(error => console.log(error));
  }

  return (
    <div className='addUser'>

      <Link to={"/"}><i class="fa-solid fa-arrow-left"></i></Link>
      <h3>Edit User Info</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input type="text" value={user.fname} onChange={inputChangeHandler} id="fname" name="fname" autoComplete='off' placeholder='First Name' required />
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input type="text" value={user.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete='off' placeholder='Last Name' required />
        </div>

        <div className="inputGroup">
          <label htmlFor="fname">Email</label>
          <input type="text" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' required />
        </div>



        <div className="inputGroup">
          <button type='submit' >Update Info</button>
        </div>
      </form>
    </div>
  )
}

export default Edit