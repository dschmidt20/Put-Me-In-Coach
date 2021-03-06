import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function SignUp({setUser, user, login, setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(e)
    // if (password === passwordConfirmation){
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      console.log(r)
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        navigate('/home')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });

}

  return (
    <div>
      <Form style={{width:'30%', margin:'auto'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConf">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"/>
        </Form.Group>
        <Button  style={{backgroundColor: 'rgb(255, 187, 2)'}} variant="light" type="submit" onClick={(e) => handleSubmit(e)}>
        {isLoading ? "Loading..." : "Sign Up!"}
        </Button><Button  style={{backgroundColor: 'rgb(255, 187, 2)', marginRight:'auto'}} variant="light" onClick={() => setLogin(!login)}>Already have an account?</Button>
        {passwordMatch ? <></> : <p style={{margin:'auto'}}><strong>Passwords must match</strong></p>}
        {!!errors && errors.map((err) => (
          <div key={err}>{err}</div>))}
      </Form>
    </div>
  )
}

export default SignUp