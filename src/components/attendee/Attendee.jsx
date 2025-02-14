import './Attendee.css';
import imgUpload from '../../assets/img-upload.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { TicketContext } from '../../context/TicketProvider';

const USER_REGEX = /^[A-Za-z]{2,}\s+[A-Za-z\s]{2,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Attendee() {
  const { page, setPage, formData, setFormData, addCompletedTicket } = useContext(TicketContext);
  const [error, setError] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fullNameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (formData.fullname) {
      const validName = USER_REGEX.test(formData.fullname);
      setFullNameErr(validName ? "" : "First name and last name must have at least 2 letters.");
    }

    if (formData.email) {
      const validEmail = EMAIL_REGEX.test(formData.email.trim());
      setEmailErr(validEmail ? "" : "Enter a valid email.");
    }

    setUploadErr("");
    setSubmitting(false);
  }, [formData.fullname, formData.email]);

  const handleImageUpload = (file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
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
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "fullname") {
      setFullNameErr(USER_REGEX.test(value) ? "" : "First name and last name must have at least 2 letters.");
    }

    if (name === "email") {
      setEmailErr(EMAIL_REGEX.test(value.trim()) ? "" : "Enter a valid email.");
    }
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

    if (!formData.fullname || fullNameErr) {
      fullNameRef.current.focus();
      return;
    }

    if (!formData.email || emailErr) {
      emailRef.current.focus();
      return;
    }

    if (!formData.image) {
      setUploadErr("Please upload a picture.");
      return;
    }

    setUploadErr("");
    setEmailErr("");
    setSubmitting(false);
    setPage(3);
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
            {formData.image ? (
              <img src={formData.image} alt='uploaded' className='uploaded-image' />
            ) : (
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
            aria-invalid={fullNameErr !== ""} 
            ref={fullNameRef}
          />
          <small className="error">{fullNameErr}</small>
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
          <small className="error">{emailErr}</small>
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
        <button className='get-btn' type='submit'>{submitting ? "Submitting..." : `Get My ${formData.ticketType} ticket`}</button>
      </div>
    </form>
  );
}

export default Attendee;
