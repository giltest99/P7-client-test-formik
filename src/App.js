import React, {useState} from 'react';
import { useFormik } from 'formik';
import axios from 'axios'

const App = () => {
  const [posts, setPosts] = useState([]);
  const url = 'http://localhost:3000/api/posts/';
  const formik = useFormik({
    initialValues: {
      user_id: '',
      title: '',
      content: '',
      image: '',
    },
    onSubmit: (values) => {
      console.log(values);

      const formData = new FormData();
      console.log(formData);

      for (let value in values) {
        formData.append(value, values[value]);
        console.log(value, values[value])
      }

      axios.post(url, formData).then((res) => {
        setPosts(posts.concat(res.data));
      });
    }
  });

  

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className='w3-container w3-center'>
      <h1>CREATE POST</h1>
      <div className='w3-container w3-margin'>
        <label>User ID</label>
        <br />
        <input
          type='text'
          name='user_id'
          onChange={formik.handleChange}
          value={formik.values.user_id}
        />
      </div>

      <div className='w3-container w3-margin'>
        <label>Titre</label>
        <br />
        <input
          type='text'
          name='title'
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </div>

      <div className='w3-container w3-margin'>
        <label>Content</label>
        <br />
        <input
          type='text'
          name='content'
          onChange={formik.handleChange}
          value={formik.values.content}
        />
      </div>

      <div className='w3-container w3-margin'>
        <label>Upload File</label>
        <br />
        <input
          type='file'
          name='image'
          accept='image/*'
          onChange={(e) =>
            formik.setFieldValue('image', e.currentTarget.files[0])
          }
          style={{color:'blue'}}
        />
      </div>
      <br />

      <div className='w3-container w3-margin'>
        <button type='submit' className='w3-btn w3-indigo w3-padding-large'>Submit</button>
      </div>
      

    </form>
  );
};

export default App;