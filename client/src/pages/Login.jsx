import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      localStorage.setItem('userId', mutationResponse.data.login.user._id)
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
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
        <h2 className="text-uppercase fw-bold text-success px-2">Login to your account</h2>
        <form className="form signup-form" onSubmit={handleFormSubmit}>
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
            <button className="btn btn-success" type="submit">Login</button>
          </div>
          <p className="text-center text-muted mt-3 mb-0">Don't have an account? <Link to="/signup">Register Here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
