import { render, fireEvent, act } from '@testing-library/react';
import NewMeetupForm from '../../../components/meetups/NewMeetupForm';


test('submit button remains disable when image input isn\'t correct', async () => {
    // Arrange
    const { findByLabelText, findByText } = render(<NewMeetupForm />);

    const titleInput = await findByLabelText('Meetup Title');
    const imageInput = await findByLabelText('Meetup Image');
    const addressInput = await findByLabelText('Address');
    const descriptionInput = await findByLabelText('Description');
    const submitButton = await findByText('Add Meetup');

    // Act
    await act(async () => {
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(
            imageInput,
            { target: { value: 'https://cdn.forbes.ru/forbes-static/new/2022/04/1-TASS-50568660-6267b31b73931.jpg' } }
        );
        fireEvent.change(addressInput, { target: { value: 'Test Address' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });

    // Assert
        expect(submitButton).toBeDisabled();
});
