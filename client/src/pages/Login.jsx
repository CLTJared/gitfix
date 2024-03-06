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
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-9 col-lg-7">
        <div className="card">
          <div className="card-body p-5">
            <h1 className="text-uppercase text-center text-success mb-5">Login to your account</h1>
            <form className="form signup-form" onSubmit={handleFormSubmit}>
              <div className="form-outline mb-4">
                <label htmlFor="email" className="form-label"></label>
                <input
                  className="form-control form-control-lg"
                  placeholder="E-mail"
                  name="email"
                  type="text"
                  id="email"
                  onChange={handleChange}
                  required />
                <div className="invalid-feedback">
                  Please enter a valid e-mail address.
                </div>
              </div>
              <div className="form-outline mb-4">
                <label htmlFor="password" className="form-label"></label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  required />
                <div className="invalid-feedback">
                  Please input your Github username.
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn btn-success" type="submit">Login</button>

              </div>

              <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/signup">Register Here</Link></p>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
