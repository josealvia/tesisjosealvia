import axios from 'axios'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router'



const URI = 'http://localhost:5000/auth/login'


    
const CompLogin =() =>{

    const [correousuario , setCorreousuario]= useState('')
    const [contraseñausuario , setContraseñausuario]= useState('')
    //const [loginSuccessful, setLoginSuccessful] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(false);


    const handdleLogin= async (e)  =>{
        e.preventDefault();
        

        const data ={
            correousuario:correousuario,
            contraseñausuario:contraseñausuario
        };
        try {
            const response = await axios.post(URI, data,{
                headers:{
                    'content-Type': 'application/json'
                },
            });
            const result = response.data;
            if(result.token){
                localStorage.setItem('token', result.token)
                localStorage.setItem('user',JSON.stringify(result.data));
                //setLoginSuccessful(true);
                window.location.href = '/home';

            }else{
                //setLoginSuccessful(false)
                setError(true);
                console.log("Error de autenticación. error:", error);

            }
            
        } catch (error) {
            console.log(error)
            setError(true);
            
        }
        
    }

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header text-center">Iniciar sesión</div>
                <div className="card-body">
                  <form className="custom-form">
                    {error && (
                      <div>
                        <p className="alert alert-danger">Correo o contraseña incorrecta.</p>
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => setCorreousuario(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setContraseñausuario(e.target.value)}
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary"
                        onClick={handdleLogin}
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      );
}

export default CompLogin
    
        
       
           
    
        
    
        
    
        
    
    
     



