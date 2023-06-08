import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import classes from './NewMeetupForm.module.css';
import Card from '../card/Card';


function NewMeetupForm(props) {
  const [isLoading, setIsLoading] = useState(false);

  //validation fields when they are onBlur. This default property is true in Formik.
  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    image: Yup.string()
      .url('Invalid URL')
      .matches(
        /^(https?:\/\/)(cdn.pixabay.com|upload.wikimedia.org)\S*$/,
        'Oops, only images from cdn.pixabay.com and upload.wikimedia.org are allowed.'
      )
      .required('Required'),
    address: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const initialValues = {
    title: '',
    image: '',
    address: '',
    description: '',
  };

  //send values for futere POST request
  function handleSubmit(values) {
    props.onAddMeetup(values);

    setIsLoading(prevLoad => !prevLoad);
  }

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Check all fields are valid and not initial to disable/acivate submit button*/}
        {({ isValid, dirty }) => (
          <Form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor='title'>Meetup Title</label>
              <Field type='text' id='title' name='title'/>
              <ErrorMessage name='title' component='div' className={classes.error} />
            </div>
            <div className={classes.control}>
              <label htmlFor='image'>Meetup Image</label>
              <Field type='url' id='image' name='image' placeholder='Use cdn.pixabay.com or upload.wikimedia.org' />
              <ErrorMessage name='image' component='div' className={classes.error} />
            </div>
            <div className={classes.control}>
              <label htmlFor='address'>Address</label>
              <Field type='text' id='address' name='address' />
              <ErrorMessage name='address' component='div' className={classes.error} />
            </div>
            <div className={classes.control}>
              <label htmlFor='description'>Description</label>
              <Field as='textarea' id='description' name='description' rows='5' />
              <ErrorMessage name='description' component='div' className={classes.error} />
            </div>
            <div className={classes.actions}>
              <button disabled={!isValid || !dirty || isLoading} type='submit'>{isLoading ? 'Loading...' : 'Add Meetup'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default NewMeetupForm;








