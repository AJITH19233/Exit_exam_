import React, { useState } from 'react';
import axios from 'axios';
import './Style.css';
import welcome from './WelcomePage';

const FrontendForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [verificationResult, setVerificationResult] = useState('');

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      // Send email to backend
      await axios.post('http://localhost:5000/submit-email', { email });
      setEmailSent(true);
      alert('OTP sent successfully!');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to send OTP. Please try again later.');
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      // Verify
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      if (response.data.matched) {
        setVerificationResult('OTP matched successfully');
        window.location.href = '/welcome'; 
      } else {
        alert('Invalid OTP entered');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please try again later.');
    }
  };

  return (

    <div className='container'>
        <center><h1>OTP VERIFICATION</h1></center>
      <form onSubmit={handleSubmitEmail}>
        <label>Enter_Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
      </form>

      {emailSent && (
        <div className='container'>
          <h2>Enter OTP</h2>
          <form onSubmit={handleSubmitOtp}>
            <label>OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <button type="submit">Verify OTP</button>
          </form>
        </div>
      )}

      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
};

export default FrontendForm;
