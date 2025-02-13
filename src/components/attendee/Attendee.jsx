import './Attendee.css'
import imgUpload from '../../assets/img-upload.svg'
import { useEffect, useState } from 'react';

function Attendee({handlePrev}) {
  const [formdata, setFormData] = useState({
    fullname: "",
    email: "",
    about: "",
    image: null,
  })

  const [error, setError] = useState("")

  

  useEffect(() => {
    const fetchtedImage =  localStorage.getItem('uploadedImage');
    if (fetchtedImage) {
      setFormData((prev) => ({
        ...prev,
        [image] : imageData
      }))
    }
  }, [])

  const handleImageUpload = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5mb. Please upload a smaller file.")
        return;
      }
      setError("")
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setFormData((prev) => ({
          ...prev,
          [image] : imageData
        }))
        localStorage.setItem("uploadedImage", imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const onFileChange = (event) => {
    handleImageUpload(event.target.files[0])
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]
    handleImageUpload(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
        <form onSubmit={handleSubmit} className="info-container">
        <div className='upload-container'>
          <h1>Upload Profile Photo</h1>
          <div className='image-container'>
            <label htmlFor="fileUpload" className='upload-box' onDragOver={onDragOver} onDrop={onDrop}>
              {formdata.image ? <img src={formdata.image} alt='uploaded' className='uploaded-image'/> : (
                  <div className='upload-placeholder'>
                    <img src={imgUpload} alt="drop icon" />
                    <p>Drag & drop or click to upload</p>
                  </div>
               )}
              </label>              
              <input type="file" id="fileUpload" accept="image/*" className='file-input' />
              {error && <p className='error-message'>{error}</p>}
          </div>
        </div>
        <hr />
        <div className='input-area'>
          <div className='fullname'>
            <label htmlFor="fullname">Enter your name</label>
            <input type="text" name='fullname' onChange={(e) => setFormData(e.target.value)} minLength={6} required/>
          </div>
          <div className='email-con'>
            <label htmlFor="email">Enter your email</label>
            <input type="email" name='email' placeholder='hello@email.com' onChange={(e) => setFormData(e.target.value)} required/>
          </div>
          <div className='about-con'>
            <label htmlFor="about">About the project</label>
            <textarea name="about" id="about" onChange={(e) => setFormData(e.target.value)} required/>
          </div>
        </div>
        <div className='btn-con'>
          <button className='back' onClick={handlePrev}>Back</button>
          <button className='get-btn' type='submit'>Get My Free Ticket</button>
        </div>
      </form>
  )
}

export default Attendee