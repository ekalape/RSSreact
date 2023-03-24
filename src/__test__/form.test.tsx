import { describe, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import FormPage from '../FormPage/FormWrapper';
import userEvent from '@testing-library/user-event';
import ModalInfoComponent from '../UnrelatedComponents/ModalInfoComponent';

describe('Form Page', () => {
  window.URL.createObjectURL = vi.fn();
  beforeEach(() => {
    render(<FormPage />);
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('Form Page renders correctly', async () => {
    expect(screen.getByText(/compile/i));
    expect(screen.getByPlaceholderText(/firstname/i));
    expect(screen.getByPlaceholderText(/lastname/i));
    expect(screen.getByPlaceholderText(/city/i));
  });
  it('Correctly shows error messages when all the inputs remain empty', async () => {
    const submitBtn = screen.getByText(/submit/i);
    act(() => {
      fireEvent.click(submitBtn);
    });
    expect(screen.findByText(/have to upload/i));
    const errorMessages = await screen.findAllByText(/required/i);
    expect(errorMessages.length).toBe(6);
  });
});

describe('Compiling Form Test', () => {
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  window.URL.createObjectURL = vi.fn();
  const user = userEvent.setup();
  beforeEach(() => {
    render(<FormPage />);
  });

  it('No error messages are shown when all mandatory fields are compiled', async () => {
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    const fileInput = screen.getByLabelText(/file/i);
    const firstnameInput = await screen.findByLabelText(/firstname/i);

    fireEvent.change(firstnameInput, { target: { value: 'Terry' } });
    fireEvent.change(screen.getByLabelText(/lastname/i), { target: { value: 'Breown' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'City' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2000-02-02' } });
    user.click(screen.getByLabelText(/female/i));
    user.click(screen.getByLabelText(/permission/i));
    user.upload(fileInput, file);

    user.click(submitBtn);

    const fileErrorMessage = screen.queryByText(/have to upload/i);
    expect(fileErrorMessage).toBeNull();

    const requiredMessage = screen.queryByText(/required/i);
    expect(requiredMessage).toBeNull();
    const cardsContainer = await screen.findByRole('form-cards-container');
    await waitFor(
      () => {
        expect(cardsContainer.children).toHaveLength(1);
      },
      { timeout: 1000 }
    );
  });
  it('Modal renders correctly', () => {
    render(<ModalInfoComponent />);
    expect(screen.getByText(/thank you/i)).toBeVisible();
  });
});
