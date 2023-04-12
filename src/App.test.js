import React, { useState as useStateMock } from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('Header', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState])
  });

  test('renders answer length pickers', () => {
    render(<App />);
    const button = screen.getByText(/CLICK HERE TO CONFIRM ANSWER LENGTH/i);
    const plus = screen.getByText("+");
    const minus = screen.getByText("-");
    expect(button).toBeInTheDocument();
    expect(plus).toBeInTheDocument();
    expect(minus).toBeInTheDocument();
  });

  test('choose answer length 6', () => {
    render(<App />);
    const plus = screen.getByText("+");
    fireEvent.click(plus);
    const button = screen.getByText(/CLICK HERE TO CONFIRM ANSWER LENGTH/i);
    fireEvent.click(button);
    expect(setState).toHaveBeenCalledWith(6);
  });

  test('choose answer length 4', () => {
    render(<App />);
    const minus = screen.getByText("-");
    fireEvent.click(minus);
    const button = screen.getByText(/CLICK HERE TO CONFIRM ANSWER LENGTH/i);
    fireEvent.click(button);
    expect(setState).toHaveBeenCalledWith(4);
  });

});