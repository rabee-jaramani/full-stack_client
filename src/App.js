import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'


function App() {
  const id_search = useRef()
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [mobile, setMobile] = useState()
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)
  const handleId = () => {
    setId(id_search.current.value)
    console.log(id)
  }
  const handleClick = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, mobile: mobile })
    };
    fetch('http://localhost:5000/data', requestOptions)
      .then(response => response.json())
      .then(data => console.log('DATA STORED', data));
  }
  const search_for_user = () => {
    axios.get(`http://localhost:5000/user/` + id)
      .then(response => {
        const user = response.data
        setUser(user)
        console.log('user from db is', user)
      })
  }
  const fetch_users = () => {
    axios.get(`http://localhost:5000/all-users`)
      .then(response => {
        const users_DB = response.data
        setUsers(users_DB)
      })
  }
  useEffect(() => {
    console.log('location', window.location.href.substr(27))

  }, [])

  return (
    <div className="App">
      <h1>App</h1>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder='Mobile' onChange={(e) => setMobile(e.target.value)} /><br />
      <button onClick={handleClick}>Submit</button>
      <br />
      <br />
      <br />
      <br />
      <button onClick={fetch_users}>Get All Users</button>
      {users ? users.map((user) => { return <><p>{user.name}</p><p>{user.mobile}</p></> }) : <p>list</p>}
      <br />
      <br />
      <h1>Serch by id</h1>
      <input type='text' ref={id_search} onChange={handleId} />
      <button onClick={search_for_user}>Search</button>
      <h1>User Found</h1>
      {user ? <>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </> : ''}

    </div>
  );
}

export default App;
