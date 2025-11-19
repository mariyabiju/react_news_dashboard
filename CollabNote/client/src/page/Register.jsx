import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const[form,setForm]=useState({email:'',password:''})
    const[otpSent,setOtpSent]=useState(false)
    const [timer,setTimer]=useState(0)
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [error, setError] = useState("");
    
    const navigate=useNavigate();

    const validateEmail= (email)=>{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleSendOtp= async()=>{
        if (!validateEmail(form.email)){
            setError("Enter a valid email address")
        }
        else{
            try{
                const res=await API.post('/auth/sendOtp',{email:form.email})
                setOtpSent(true);
                setTimer(20)
            }
            catch{
                
            }

        }

    const  handleChange=(e)=> setForm({...form,[e.target.name]:e.target.value})
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const res= await API.post('/auth/register',form);
            alert("Registered")
            navigate('/login')
        }
        catch(err){
            alert(err.response.data.msg)
        }
    };

    return( 
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name='email' placeholder="Email" onChange={handleChange}/>
            <button onClick={handleSendOtp} disabled={timer>0}>{timer>0?`Resend Otp in {timer}s`:"Send Otp"}</button>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
            {error&&<p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        </form>

    );
} 
}
