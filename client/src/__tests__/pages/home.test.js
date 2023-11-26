import { screen, render, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/home/Home';

describe('Rendering the home page', () => {
  test('it displays a navbar with logo text and 2 buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('logo-title');

    const register = screen.getByRole('button', { name: 'Register' });
    const login = screen.getByRole('button', { name: /login/i });

    expect(title).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  test('it displays a header with five navigation items', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const header = screen.getByTestId('heading');

    const items = within(header).getAllByTestId('headerList');

    expect(items).toHaveLength(5);
  });

  test('it contains a Sign in / Register button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', {
      name: /sign in/i,
    });
    expect(button).toBeInTheDocument();
  });

  test('it renders the header search section with an input box for location, a calender setter, number pf persons setter and a search button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const locationInput = screen.getByPlaceholderText(/where are you going/i);

    const calendarSetter = screen.getByTestId('calendarPicker');

    const personsPicker = screen.getByTestId('personsPicker');

    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    expect(locationInput).toBeInTheDocument();
    expect(calendarSetter).toBeInTheDocument();
    expect(personsPicker).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});

describe('Rendering the home page and checking it functionalities', () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  };

  it('renders an empty location input box', () => {
    renderComponent();

    const searchContainer = screen.getByTestId('header-search');

    const locationInput = within(searchContainer).getByRole('textbox');

    expect(locationInput).toHaveValue('');
  });

  it('the input contains text when users type into it', () => {
    renderComponent();

    const text = 'california';

    const searchContainer = screen.getByTestId('header-search');

    const locationInput = within(searchContainer).getByRole('textbox');

    user.click(locationInput);
    user.keyboard(text);

    expect(locationInput).toHaveValue(text);
  });

  it('opens the calendar component and selects a date range when user click the date input', () => {
    renderComponent();

    const calendarPicker = screen.getByTestId('calendarPicker');

    user.click(calendarPicker);

    const calendar = screen.getByTestId('date-range');

    expect(calendar).toBeInTheDocument();
  });
});
