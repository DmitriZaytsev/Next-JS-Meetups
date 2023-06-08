import { render, fireEvent, act } from '@testing-library/react';
import NewMeetupForm from '../../../components/meetups/NewMeetupForm';


test('submit button remains disabled if all fields touched, but aren\'t filled', async () => {
    // Arrange
    const { findByLabelText, findByText } = render(<NewMeetupForm />);

    const titleInput = await findByLabelText('Meetup Title');
    const imageInput = await findByLabelText('Meetup Image');
    const addressInput = await findByLabelText('Address');
    const descriptionInput = await findByLabelText('Description');
    const submitButton = await findByText('Add Meetup');

    // Act
    await act(async () => {
        titleInput.focus();
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(
            imageInput,
            { target: { value: 'https://cdn.pixabay.com/photo/2018/12/13/11/48/zaryadye-3872704_1280.jpg' } }
        );
        fireEvent.change(addressInput, { target: { value: 'Test Address' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });

    // Assert
    expect(submitButton).toBeEnabled();
});
