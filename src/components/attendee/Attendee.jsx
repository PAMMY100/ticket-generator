import './Attendee.css';
import imgUpload from '../../assets/img-upload.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { TicketContext } from '../../context/TicketProvider';

const USER_REGEX = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function Attendee() {
  const { page, setPage, formData, setFormData } = useContext(TicketContext);
  const [error, setError] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fullNameRef = useRef();
  const emailRef = useRef();
  
  useEffect(() => {
    const validName = USER_REGEX.test(formData.fullname);
    if (!validName) {
      setFullNameErr("First name and last name must have at least 2 letters");
    }
    setUploadErr("");
    setFullNameErr("");
    setSubmitting(false);
  }, [formData, formData.fullname, formData.email]);

  const handleImageUpload = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5mb. Please upload a smaller file.");
        setSubmitting(false);
        return;
      }
      if (!file) {
        setSubmitting(false);
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setFormData((prev) => ({
          ...prev,
          image: imageData
        }));
        localStorage.setItem("uploadedImage", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    const validName = USER_REGEX.test(formData.fullname);
    if (!validName) {
      setFullNameErr("First name and last name must have at least 2 letters");
    }
    const validEmail = EMAIL_REGEX.test(formData.email.trim());
    if (!validEmail) setEmailErr("Enter a valid email");
    setFullNameErr("");
    setEmailErr("");
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (formData.image?.length < 2) {
      setUploadErr("Please upload a picture");
    }
    const validEmail = EMAIL_REGEX.test(formData.email.trim());
    if (!validEmail) setEmailErr("Please enter a valid email");

    if (fullNameErr === "" && emailErr === "" && formData.image?.length > 5) {
      setPage(3);
    } else {
      if (fullNameErr !== "") {
        fullNameRef.current.focus();
      } else if (emailErr !== "") {
        emailRef.current.focus();
      } 
    }

    setUploadErr("");
    setEmailErr("");
    setSubmitting(false);
  };

  const handlePrev = () => {
    setPage(1);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='upload-container'>
        <h1>Upload Profile Photo</h1>
        <div className='image-container'>
          <label htmlFor="fileUpload" className='upload-box' onDragOver={onDragOver} onDrop={onDrop}>
            {formData.image ? <img src={formData.image} alt='uploaded' className='uploaded-image' /> : (
              <div className='upload-placeholder'>
                <img src={imgUpload} alt="drop icon" />
                <p>Drag & drop or click to upload</p>
              </div>
            )}
          </label>
          <input type="file" id="fileUpload" accept="image/*" className='file-input' onChange={(e) => handleImageUpload(e.target.files[0])} />
          {error && <p className='error-message'>{error}</p>}
        </div>
        <p id="uploadError">
          <small aria-live="assertive">{uploadErr}</small>
        </p>
      </div>
      <hr />
      <div className='input-area'>
        <div className='fullname'>
          <label htmlFor="fullname">Enter your name</label>
          <input 
            type="text" 
            name='fullname' 
            onChange={handleChange} 
            value={formData.fullname}
            required
            aria-invalid={fullNameErr === "" ? "false" : "true"}
            aria-describedby="fullnameNote"
            ref={fullNameRef}
          />
          <small aria-live="assertive">{fullNameErr}</small>
        </div>
        <div className='email-con'>
          <label htmlFor="email">Enter your email</label>
          <input 
            type="email" 
            name='email' 
            placeholder='hello@email.com' 
            onChange={handleChange}
            value={formData.email}
            required
            ref={emailRef}
            autoComplete="off"
          />
          <small aria-live="assertive">{emailErr}</small>
        </div>
        <div className='about-con'>
          <label htmlFor="about">Request</label>
          <textarea 
            name="request" 
            id="about" 
            onChange={(e) => setFormData((prev) => ({ ...prev, request: e.target.value }))}
            value={formData.request}
          />
        </div>
      </div>
      <div className='btn-con'>
        <button type='button' className='back' onClick={handlePrev}>Back</button>
        <button className='get-btn' type='submit'>{submitting ? "Submitting..." : 'Get My Free Ticket'}</button>
      </div>
    </form>
  )
}

export default Attendee;