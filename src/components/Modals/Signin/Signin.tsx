import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaRegUser } from 'react-icons/fa6';
import axios from 'axios';
import Signup from '../Signup/Signup';
import { useForm } from 'react-hook-form';

type SomeConponentProps = {
  history: any; // To access the navigation history
};

console.log('test');

function Signin({ history }: SomeConponentProps): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>(''); // State to store error message
  const [successMessage, setSuccessMessage] = useState<string>(''); // Same but for success message
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track if user is login or not

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //Initializing React Hook Form for form handling (so it can be used below in the form)

  const login = (data: any) => {
    // To handle user login
    let params = {
      email: data.email,
      password: data.password,
    };
    axios
      .post(
        'https://katsumeme-8c128449f9bf.herokuapp.com/api/auth/login',
        params
      )
      .then(function (response) {
        // IF EMAIL ALREADY EXISTS
        if (response.data.succes === false) {
          setErrorMessage(response.data.error);
        } else {
          setSuccessMessage(response.data.message);
        }
        localStorage.setItem('auth', response.data.token); // Store the authentification token in the localStorage
        history.push('/login');
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage(
          `Une erreur s'est produite lors de la connexion. Veuillez réessayer !`
        );
        setSuccessMessage('');
      });
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    history.push('/login');
  };

  const [show, setShow] = useState(false);
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  //const [rememberMe, setRememberMe] = useState(false);
  //const [error, setError] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  //const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //  e.preventDefault();
  //  try {
  //    const response = await axios.post('.../api/login', {
  //      email,
  //      password,
  //    });
  //  } catch (error) {
  //    setError('Identifiants invalides. Veuillez réessayer');
  //  }
  //};

  return (
    <div className="Login ms-auto">
      <FaRegUser className="ImageProfile" />
      {isLoggedIn ? (
        <Button
          className="LoginButton"
          variant="outline-light"
          onClick={logout}
        >
          Se déconnecter
        </Button>
      ) : (
        <Button
          className="LoginButton"
          variant="outline-light"
          onClick={handleShow}
        >
          Se connecter
        </Button>
      )}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Se connecter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(login)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email requis' })}
              />
              {/*{errors.email && (
                <p className="text-danger" style={{ fontSize: 14 }}>
                  {errors.email.message}
                </p>
              )}*/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                {...register('password', { required: 'Mot de passe requis' })}
              />
              {/*{errors.password && (
                <p className="text-danger" style={{ fontSize: 14 }}>
                  {errors.password.message}
                </p>
              )}*/}
              <Form.Text className="text-muted">
                Ne partagez jamais votre mot de passe avec des tiers.
              </Form.Text>
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Se souvenir de moi"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
  </Form.Group>*/}
            <div className="text-center d-grid">
              <Button
                style={{ backgroundColor: '#70905f', border: 'none' }}
                type="submit"
              >
                Se connecter
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-center">
          {/*<Button
            className="mx-auto"
            style={{
              width: '100%',
              backgroundColor: '#e8811c',
              border: 'none',
            }}
          >
            Créer un compte
          </Button>*/}
          <div className="text-center d-grid">
            <Signup history={history} />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Signin;
