/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { DatePickerCore } from './DatePicker';
import {
  isSameDay,
  subMonths,
  addMonths,
  startOfMonth,
  addDays,
  subWeeks,
  subDays,
  startOfWeek,
  addWeeks,
  endOfWeek,
  format
} from 'date-fns';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');
const onDayClick = jest.fn();

const DATE_PICKER_CORE_PROPS = {
  children: () => React.createElement('div'),
  calendarOpened: false,
  defaultDate: new Date('January 17, 2019'),
  onDayClick
};

describe('DatePickerCore', () => {
  afterEach(() => {
    onDayClick.mockReset();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <DatePickerCore>
        {({ id }) => <span data-testid="target">{id}</span>}
      </DatePickerCore>
    );
    expect(getByTestId(/target/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <DatePickerCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <DatePickerCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <DatePickerCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    rerender(
      <DatePickerCore id="differentId">
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    const newId = getByTestId(/target/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const defaultDate = new Date();
      const formattedDate = format(defaultDate, 'MMMM Do YYYY');
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ calendarOpened, focusedDate, chosenDate }) => {
            return (
              <>
                <input
                  data-testid="calendarOpened"
                  type="checkbox"
                  checked={calendarOpened}
                  onChange={() => {}}
                />
                <span data-testid="focusedDate">
                  {format(focusedDate, 'MMMM Do YYYY')}
                </span>
                <span data-testid="chosenDate">
                  {format(chosenDate, 'MMMM Do YYYY')}
                </span>
              </>
            );
          }}
        </DatePickerCore>
      );

      expect(getByTestId('calendarOpened').checked).toEqual(true);
      expect(getByTestId('focusedDate')).toHaveTextContent(formattedDate);
      expect(getByTestId('chosenDate')).toHaveTextContent(formattedDate);
    });

    it('should default focused date to todays date if no default day is sent in', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({ focusedDate }) => {
            return (
              <>
                <span data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          new Date()
        )
      ).toBeTruthy();
    });

    it('should open and close helper information', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({
            showHelperInformation,
            openHelperInformation,
            closeHelperInformation
          }) => {
            return (
              <>
                <button data-testid="open" onClick={openHelperInformation}>
                  Open Helper Information
                </button>
                <button data-testid="close" onClick={closeHelperInformation}>
                  Close Helper Information
                </button>
                <input
                  type="checkbox"
                  data-testid="helperInformation"
                  checked={showHelperInformation || false}
                  onChange={() => {}}
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('open'));

      expect(getByTestId('helperInformation').checked).toBeTruthy();

      fireEvent.click(getByTestId('close'));

      expect(getByTestId('helperInformation').checked).toBeFalsy();
    });
  });

  describe('build calendar month', () => {
    it('should build the calendar for the given date', () => {
      const defaultDate = new Date('January 17, 2019');
      const { getByTestId } = render(
        <DatePickerCore>
          {({ buildCalendarMonth }) => {
            const calendarData = React.createRef();
            return (
              <>
                <button
                  data-testid="buildCalendarButton"
                  onClick={() => {
                    const month = buildCalendarMonth(defaultDate);

                    expect(month.length).toEqual(5);
                    expect(month[0][0]).toEqual(null);
                    expect(
                      isSameDay(month[0][2], new Date('January 1, 2019'))
                    ).toBeTruthy();
                  }}
                >
                  Build Calendar
                </button>
                <span
                  data-testid="calendarData"
                  ref={calendarData}
                  data-calendardata=""
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('buildCalendarButton'));
    });

    it('should build the calendar for the given date with outside dates enabled', () => {
      const defaultDate = new Date('January 17, 2019');
      const { getByTestId } = render(
        <DatePickerCore>
          {({ buildCalendarMonth }) => {
            return (
              <>
                <button
                  data-testid="buildCalendarButton"
                  onClick={() => {
                    const month = buildCalendarMonth(defaultDate, true);

                    expect(month.length).toEqual(5);
                    expect(
                      isSameDay(month[0][0], new Date('December 30, 2018'))
                    ).toBeTruthy();
                    expect(
                      isSameDay(month[0][2], new Date('January 1, 2019'))
                    ).toBeTruthy();
                  }}
                >
                  Build Calendar
                </button>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('buildCalendarButton'));
    });
  });

  describe('handle calendar focus', () => {
    it('should open the calendar on focus', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({ calendarOpened, onInputFocus }) => {
            return (
              <>
                <input data-testid="inputToFocus" onFocus={onInputFocus} />
                <span
                  data-testid="calendarOpened"
                  data-calendaropened={calendarOpened}
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      expect(
        getByTestId('calendarOpened').getAttribute('data-calendaropened')
      ).toBeFalsy();

      fireEvent.focus(getByTestId('inputToFocus'));

      expect(
        getByTestId('calendarOpened').getAttribute('data-calendaropened')
      ).toBeTruthy();
    });
  });

  describe('Focus and blur', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should handle date focus', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({ dateFocused, onDateFocus, onHelperFocus }) => {
            return (
              <>
                <div data-testid="focusDate" onFocus={onDateFocus} />
                <div data-testid="focusHelper" onFocus={onHelperFocus} />
                <input data-testid="dateFocused" checked={dateFocused} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('focusDate'));

      expect(getByTestId('dateFocused').checked).toBeTruthy();

      fireEvent.focus(getByTestId('focusHelper'));

      expect(getByTestId('dateFocused').checked).toBeFalsy();
    });

    it('should close the calendar when active element is inside of calendar container', () => {
      const { container } = render(
        <DatePickerCore {...DATE_PICKER_CORE_PROPS} calendarOpened={true}>
          {({ onCalendarBlur, calendarOpened }) => {
            return (
              <>
                <div
                  style={{ display: calendarOpened ? 'block' : 'none' }}
                  id="calendar"
                  onBlur={onCalendarBlur}
                >
                  <button id="calendarButton" />
                </div>
                <button id="notInCalendarButton" />
              </>
            );
          }}
        </DatePickerCore>
      );

      const calendarButton = container.querySelector('#calendarButton');
      const notCalendarButton = container.querySelector('#notInCalendarButton');

      calendarButton.focus();
      notCalendarButton.focus();

      jest.advanceTimersByTime(1000);

      expect(calendarButton).not.toBeVisible();
    });

    it('should not close the calendar when active element is outside of calendar container', () => {
      const { container } = render(
        <DatePickerCore {...DATE_PICKER_CORE_PROPS} calendarOpened={true}>
          {({ onCalendarBlur, calendarOpened }) => {
            return (
              <>
                <div
                  style={{ display: calendarOpened ? 'block' : 'none' }}
                  id="calendar"
                  onBlur={onCalendarBlur}
                >
                  <button id="calendarButton" />
                  <button id="calendarButton2" />
                </div>
                <button id="notInCalendarButton" />
              </>
            );
          }}
        </DatePickerCore>
      );

      const calendarButton = container.querySelector('#calendarButton');
      const calendarButton2 = container.querySelector('#calendarButton2');

      calendarButton.focus();
      calendarButton2.focus();

      jest.advanceTimersByTime(1000);

      expect(calendarButton2).toBeVisible();
    });
  });

  describe('on previous button click', () => {
    it('changes the focus date to the first of the previous month', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onPrevMonthClick }) => {
            return (
              <>
                <button
                  data-testid="prevMonthButton"
                  onClick={onPrevMonthClick}
                >
                  Previous Month
                </button>
                <span data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('prevMonthButton'));

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          startOfMonth(subMonths(defaultDate, 1))
        )
      ).toBeTruthy();
    });
  });

  describe('on next button click', () => {
    it('changes the focus date to the first of the next month', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onNextMonthClick }) => {
            return (
              <>
                <button
                  data-testid="nextMonthButton"
                  onClick={onNextMonthClick}
                >
                  Previous Month
                </button>
                <span data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('nextMonthButton'));

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          startOfMonth(addMonths(defaultDate, 1))
        )
      ).toBeTruthy();
    });
  });

  describe('on key down press', () => {
    it('handles the question mark key when typing in the input', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ showHelperInformation, onInputKeyDown }) => {
            return (
              <>
                <input data-testid="calendarInput" onKeyDown={onInputKeyDown} />
                <input
                  data-testid="helperInformation"
                  type="checkbox"
                  checked={showHelperInformation}
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.keyDown(getByTestId('calendarInput'), {
        key: '?'
      });

      expect(getByTestId('helperInformation').checked).toBeTruthy();
    });

    it('types in the input if you type anything other than the question mark key', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ showHelperInformation, onInputKeyDown }) => {
            return (
              <>
                <input data-testid="calendarInput" onKeyDown={onInputKeyDown} />
                <input
                  data-testid="helperInformation"
                  type="checkbox"
                  checked={showHelperInformation || false}
                  onChange={() => {}}
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.keyDown(getByTestId('calendarInput'), {
        key: 'abc123'
      });

      expect(getByTestId('helperInformation').checked).toBeFalsy();
    });

    it('does not update focused date if date is not focused', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown }) => {
            return (
              <>
                <table data-testid="calendarContainer" onKeyDown={onKeyDown}>
                  <span data-testid="focusedDate" data-date={focusedDate} />
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'ArrowUp',
        code: 38
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          defaultDate
        )
      ).toBeTruthy();
    });

    it('ArrowUp', async () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'ArrowUp',
        code: 38
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          subWeeks(defaultDate, 1)
        )
      ).toBeTruthy();
    });

    it('ArrowLeft', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'ArrowLeft',
        code: 37
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          subDays(defaultDate, 1)
        )
      ).toBeTruthy();
    });

    it('Home', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'Home',
        code: 36
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          startOfWeek(defaultDate)
        )
      ).toBeTruthy();
    });

    it('PageUp', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'PageUp',
        code: 33
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          subMonths(defaultDate, 1)
        )
      ).toBeTruthy();
    });

    it('PageDown', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'PageDown',
        code: 34
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          addMonths(defaultDate, 1)
        )
      ).toBeTruthy();
    });

    it('ArrowDown', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'ArrowDown',
        code: 40
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          addWeeks(defaultDate, 1)
        )
      ).toBeTruthy();
    });

    it('ArrowRight', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'ArrowRight',
        code: 39
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          addDays(defaultDate, 1)
        )
      ).toBeTruthy();
    });

    it('End', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'End',
        code: 35
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          endOfWeek(defaultDate)
        )
      ).toBeTruthy();
    });

    it('Escape', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ calendarOpened, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <input
                          data-testid="calendarOpened"
                          checked={calendarOpened}
                          onChange={() => {}}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('calendarOpened').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'Escape',
        code: 27
      });

      expect(getByTestId('calendarOpened').checked).toBeFalsy();
    });

    it('?', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ onKeyDown, onDateFocus, showHelperInformation }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <input
                          data-testid="helperInformation"
                          checked={showHelperInformation}
                          onChange={() => {}}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('helperInformation').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: '?'
      });

      expect(getByTestId('helperInformation').checked).toBeTruthy();
    });

    it('Escape without focus', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ calendarOpened, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <input
                          data-testid="calendarOpened"
                          checked={calendarOpened}
                          onChange={() => {}}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'Escape',
        code: 27
      });

      expect(getByTestId('calendarOpened').checked).toBeFalsy();
    });

    it('? without focus', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ showHelperInformation, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <input
                    data-testid="helperInformation"
                    checked={showHelperInformation}
                    onChange={() => {}}
                  />
                  <tbody>
                    <tr>
                      <td>
                        <input data-testid="calendarOpened" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      fireEvent.keyDown(getByTestId('helperInformation'), {
        key: '?'
      });

      expect(getByTestId('helperInformation').checked).toBeTruthy();
    });

    it('Enter', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ chosenDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="chosenDate"
                          data-date={chosenDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('chosenDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'Enter',
        code: 13
      });

      expect(
        isSameDay(
          getByTestId('chosenDate').getAttribute('data-date'),
          defaultDate
        )
      ).toBeTruthy();
    });

    it('Spacebar', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ chosenDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="chosenDate"
                          data-date={chosenDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('chosenDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'Space',
        code: 32
      });

      expect(
        isSameDay(
          getByTestId('chosenDate').getAttribute('data-date'),
          defaultDate
        )
      ).toBeTruthy();
    });

    it('does not update the focused date if a bad key press occurs', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onKeyDown, onDateFocus }) => {
            return (
              <>
                <table
                  data-testid="calendarContainer"
                  onFocus={onDateFocus}
                  onKeyDown={onKeyDown}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div
                          data-testid="focusedDate"
                          data-date={focusedDate}
                          tabIndex={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      getByTestId('focusedDate').focus();
      fireEvent.keyDown(getByTestId('calendarContainer'), {
        key: 'f',
        code: 70
      });

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          defaultDate
        )
      ).toBeTruthy();
    });
  });

  describe('on day click', () => {
    it('should updated the chosen date and close the calendar', () => {
      const defaultDate = new Date();
      const newDate = addDays(defaultDate, 1);
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ calendarOpened, chosenDate, onDateFocus, onDayClick }) => {
            return (
              <>
                <div
                  data-testid="calendarContainer"
                  role="table"
                  onFocus={onDateFocus}
                >
                  <button
                    data-testid="dayClickButton"
                    onClick={() => {
                      onDayClick(newDate);
                    }}
                  >
                    Click Day
                  </button>
                  <span data-testid="chosenDate" data-date={chosenDate} />
                  <input
                    data-testid="calendarOpened"
                    checked={calendarOpened}
                    onChange={() => {}}
                  />
                </div>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      fireEvent.click(getByTestId('dayClickButton'));

      expect(
        isSameDay(getByTestId('chosenDate').getAttribute('data-date'), newDate)
      ).toBeTruthy();
      expect(getByTestId('calendarOpened').checked).toBeFalsy();
    });

    it('should call the passed in onDayClick function', () => {
      const onDayClickSpy = jest.fn();
      const defaultDate = new Date();
      const newDate = addDays(defaultDate, 1);
      const { getByTestId } = render(
        <DatePickerCore
          calendarOpened={true}
          defaultDate={defaultDate}
          onDayClick={onDayClickSpy}
        >
          {({ onDayClick }) => {
            return (
              <>
                <div data-testid="calendarContainer" role="table">
                  <button
                    data-testid="dayClickButton"
                    onClick={() => {
                      onDayClick(newDate);
                    }}
                  >
                    Click Day
                  </button>
                </div>
              </>
            );
          }}
        </DatePickerCore>
      );

      const event = {};
      fireEvent.focus(getByTestId('calendarContainer'));
      fireEvent.click(getByTestId('dayClickButton'), event);

      expect(onDayClickSpy).toHaveBeenCalled();
    });
  });
});