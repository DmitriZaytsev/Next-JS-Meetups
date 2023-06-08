import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Snackbar from '../../components/utils/Snackbar';

function NewMeetupPage() {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await response.json();

    setSnackbarOpen(prevSnackOpen => !prevSnackOpen);

    setTimeout(() => router.replace('/'), 500);
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(prevSnackOpen => !prevSnackOpen);

  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
      <Snackbar open={isSnackbarOpen} message={`Meetup was added!`} onClose={handleSnackbarClose} />
    </>
  );
}

export default NewMeetupPage;
