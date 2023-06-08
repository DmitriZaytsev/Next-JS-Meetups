import { render, fireEvent, act } from '@testing-library/react';
import NewMeetupForm from '../../../components/meetups/NewMeetupForm';


test('submit button remains disabled if all fields aren\'t filled', async () => {
    // Arrange
    const { findByLabelText, findByText } = render(<NewMeetupForm />);

    //input "description" didn't filled
    const titleInput = await findByLabelText('Meetup Title');
    const imageInput = await findByLabelText('Meetup Image');
    const addressInput = await findByLabelText('Address');
    const submitButton = await findByText('Add Meetup');

    // Act
    await act(async () => {
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(
            imageInput,
            { target: { value: 'https://cdn.pixabay.com/photo/2018/12/13/11/48/zaryadye-3872704_1280.jpg' } }
        );
        fireEvent.change(addressInput, { target: { value: 'Test Address' } });
    });

    // Assert
        expect(submitButton).toBeDisabled();
});
