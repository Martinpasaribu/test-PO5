import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const [loading, setLoading] = useState(false);

  const Auth  = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
            await  axios.post("https://server-po-5.vercel.app/login", 
            {
                email:email,
                password:password,
            });
            navigate("/dashboard");
    } catch (error) {
        if (error.response){
            setMsg(error.response.data.msg)
        }

    }
    finally {
      setLoading(false); 
    }
}


  return (
    <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column  is-4-desktop">

              <form onSubmit={Auth} action="" className="box">
             
              <p className='has-text-centered' > {msg}</p>
              {loading ? ( // Periksa status loading untuk menampilkan pesan loading atau data
            
              <div className="spinner m-auto "></div>
              
            ) : (
                
                <div className="field mt-5 " >
                  <label  className="label">
                    Email dan Username
                  </label>
                  <div className="controls">
                    <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Username' />
                  </div>
                  <label  className="label mt-5">
                    Password
                  </label>
                  <div className="controls">
                    <input type="password " className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=':(----:(' />
                  </div>
                  <div className="field mt-5">

                      <button className="button is-success is-fullwidth">
                        Login
                      </button>
                
                  </div>
                
                </div>
                )}
              </form>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Login