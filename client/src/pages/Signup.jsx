import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container mb-4 d-flex justify-content-center">
      <div className="card p-4">
        <h2 className="text-uppercase fw-bold text-success px-3">Sign-Up / Create Account</h2>
        <form className="form signup-form" onSubmit={handleFormSubmit}>
          <div className="form-floating my-3">
            <input
              htmlFor='firstname'
              className="form-control form-control-lg"
              type="text"
              id="firstName"
              onChange={handleChange}
              required />
            <label htmlFor="firstName" className="form-label">First Name</label>
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control form-control-lg"
              name="lastName"
              type="text"
              id="lastName"
              onChange={handleChange}
              required />
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>

          <div className="form-floating my-3">
            <input
              className="form-control form-control-lg"
              name="email"
              type="text"
              id="email"
              onChange={handleChange}
              required />
            <label htmlFor="email" className="form-label">E-Mail: example@host.com</label>
            <div className="invalid-feedback">
              Please enter a valid e-mail address.
            </div>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control form-control-lg"
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              required />
            <label htmlFor="password" className="form-label">Password</label>
            <div className="invalid-feedback">
              Please input your Github username.
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn btn-success" type="submit">Sign Up</button>
          </div>

          <p className="text-center text-muted mt-3 mb-0">Have already an account? <Link to="/login">Login Here</Link></p>

        </form>
      </div>
    </div>
  );
}

export default Signup;
