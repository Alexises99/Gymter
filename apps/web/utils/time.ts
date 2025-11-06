const msInADay = 24 * 60 * 60 * 1000
const msInAMonth = 2629743360
const msInAWeek = 7 * msInADay

function getMondayAndReset(date: Date) {
  const actual = date
  // Set the prev monday
  actual.setUTCHours(0, 0, 0, 0)
  actual.setUTCDate(actual.getUTCDate() - actual.getUTCDay() + 1)

  return actual
}

/**
 * Gets the week number for a specific date based on ISO-8601.
 *
 * @param date - The date for which to calculate the week number.
 * @returns The ISO week number for the date.
 */
function getWeekNumber(date: Date) {
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCDate(date.getUTCDate() + 3 - (date.getUTCDay() || 7))

  const firstThursday = new Date(
    Date.UTC(date.getUTCFullYear(), 0, 4, 0, 0, 0, 0)
  )

  const diff = (+date - +firstThursday) / msInADay

  return Math.ceil((diff + firstThursday.getUTCDay() + 1) / 7)
}

/**
 * Gets the month number (1-12) for a specific date.
 *
 * @param date - The date for which to get the month number.
 * @returns The month number (1-12).
 */
function getMonthNumber(date: Date) {
  return date.getUTCMonth() + 1
}

/**
 * Gets the name of a month based on the locale and timestamp.
 *
 * @param locale - The locale string (e.g., 'en-US').
 * @param ms - The timestamp in milliseconds.
 * @returns The full month name in the specified locale.
 */
function getMonthName(
  locale: string,
  date: Date,
  format: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow'
): string {
  const formatter = new Intl.DateTimeFormat(locale, { month: format })
  return formatter.format(date)
}

/**
 * Generates an array of objects representing each week from the current date
 * going back exactly one year.
 *
 * Each object contains:
 * - `year`: The year of the specific week.
 * - `week`: The week number of the specific date within that year.
 *
 * The function uses the `getWeekNumber` helper function to calculate the week number
 * for a given date.
 *
 * @returns An array of objects where each object has `year` and `week` properties, representing
 *          each week from today up to one year ago.
 */
function generateWeeksAYearAgo(): { year: number; value: number }[] {
  const weeks: { year: number; value: number }[] = []
  const actual = new Date()

  const endDate = new Date(actual)
  endDate.setUTCFullYear(endDate.getUTCFullYear() - 1)

  while (actual > endDate) {
    weeks.push({ year: actual.getUTCFullYear(), value: getWeekNumber(actual) })

    actual.setUTCDate(actual.getUTCDate() - 7)
  }

  return weeks
}

/**
 * Generates an array of objects representing each month from the current date
 * going back exactly one year.
 *
 * Each object contains:
 * - `year`: The year of the specific month.
 * - `month`: The month number (1-12) of the specific date within that year.
 *
 * The function iterates over the previous 12 months, subtracting one month
 * at each step, and constructs an object containing the year and month number.
 *
 * @returns An array of objects where each object has `year` and `month` properties, representing
 *          each month from today up to one year ago.
 */
function getMonthsAYearAgo(): { year: number; value: number }[] {
  const months: { year: number; value: number }[] = []

  const actual = new Date()
  actual.setUTCHours(0, 0, 0, 0)

  const monthsRange = 12

  for (let i = 0; i < monthsRange; i++) {
    const newDate = new Date(+actual)
    newDate.setUTCMonth(newDate.getUTCMonth() - i)
    months.push({
      year: newDate.getUTCFullYear(),
      value: newDate.getUTCMonth() + 1
    })
  }

  return months
}

function getDayByMs(milliseconds: number): number {
  const date = new Date(milliseconds)
  return date.getUTCDate()
}

/**
 * Gets the week number from a timestamp, assuming the first Monday of the year as the starting week.
 *
 * @param milliseconds - The timestamp in milliseconds.
 * @returns The calculated week number for the given date.
 */
function getWeekByMs(milliseconds: number): number {
  const msInADay = 24 * 60 * 60 * 1000 // Milliseconds in a day
  const date = new Date(milliseconds)

  // Get the first day of the year
  const startOfYear = new Date(
    Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0)
  )

  // Calculate the day of the week for the first day of the year (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startDayOfWeek = (startOfYear.getUTCDay() + 6) % 7 // Convert Sunday-based to Monday-based (0 = Monday)

  // Find the first Monday of the year
  const firstMonday = new Date(startOfYear)
  firstMonday.setUTCDate(startOfYear.getUTCDate() + ((7 - startDayOfWeek) % 7))

  // Calculate the difference in days from the first Monday to the given date
  const daysSinceFirstMonday = Math.floor((+date - +firstMonday) / msInADay)

  // Calculate the week number (adding 1 because the first week is week 1, not 0)
  const week = Math.ceil((daysSinceFirstMonday + 1) / 7)

  // Ensure the week number is at least 1
  return week > 0 ? week : 1
}

/**
 * Gets the month number (1-12) from a timestamp.
 *
 * @param milliseconds - The timestamp in milliseconds.
 * @returns The month number (1-12) for the date.
 */
function getMonthByMs(milliseconds: number): number {
  const date = new Date(milliseconds)
  return date.getUTCMonth() + 1
}

function getDaysRange(startMs: number, endMs: number) {
  const days: number[] = []

  const startDate = new Date(startMs)
  startDate.setUTCHours(0, 0, 0, 0)
  let currentMs = startDate.getTime()

  if (currentMs > startMs) {
    currentMs -= msInADay
  }

  while (currentMs <= endMs) {
    days.push(currentMs)
    currentMs += msInADay
  }

  return days
}

/**
 * Generates a range of timestamps representing each week between two timestamps.
 *
 * @param startMs - The starting timestamp in milliseconds.
 * @param endMs - The ending timestamp in milliseconds.
 * @returns An array of timestamps, each representing the start of a week within the range.
 */
function getWeeksRange(startMs: number, endMs: number) {
  const weeks: number[] = []

  const actual = new Date(startMs)
  const date = getMondayAndReset(actual)
  date.setUTCDate(date.getUTCDate())

  while (date.getTime() <= endMs) {
    weeks.push(date.getTime())
    date.setUTCDate(date.getUTCDate() + 7)
  }

  return weeks
}

/**
 * Generates a range of timestamps representing each month between two timestamps.
 *
 * @param startMs - The starting timestamp in milliseconds.
 * @param endMs - The ending timestamp in milliseconds.
 * @returns An array of timestamps, each representing the start of a month within the range.
 */
function getMonthsRange(startMs: number, endMs: number): number[] {
  const months: number[] = []

  const actual = new Date(startMs)
  actual.setUTCDate(1)
  actual.setUTCHours(0, 0, 0, 0)

  while (actual.getTime() <= endMs) {
    months.push(actual.getTime())
    actual.setUTCMonth(actual.getUTCMonth() + 1)
  }

  return months
}

/**
 * Initializes a date range in milliseconds representing a weekly period centered on a given date.
 *
 * @param initialGap - The number of weeks to include in the radius.
 * @param date - The starting date, defaulting to the current date.
 * @returns A tuple where:
 *          - The first element is the timestamp for the center.
 *          - The second element is the duration in milliseconds representing the radius.
 */
function initializeRangeDays(initialGap: number, date: Date): [number, number] {
  const actual = date

  const radius = initialGap * msInADay
  return [actual.getTime(), radius]
}

/**
 * Initializes a date range in milliseconds representing a weekly period centered on a given date.
 *
 * @param initialGap - The number of weeks to include in the radius.
 * @param date - The starting date, defaulting to the current date.
 * @returns A tuple where:
 *          - The first element is the timestamp for the center.
 *          - The second element is the duration in milliseconds representing the radius.
 */
function initializeRangeWeeks(
  initialGap: number,
  date: Date
): [number, number] {
  const actual = date
  // Set the prev monday
  const start = getMondayAndReset(actual)

  const radius = initialGap * msInAWeek
  return [start.getTime(), radius]
}

/**
 * Initializes a date range in milliseconds representing a monthly period centered on a given date.
 *
 * @param initialGap - The number of months to include in the radius.
 * @param date - The starting date, defaulting to the current date.
 * @returns A tuple where:
 *          - The first element is the timestamp for the center.
 *          - The second element is the duration in milliseconds representing the radius.
 */
function initializeRangeMonths(
  initialGap: number,
  date: Date
): [number, number] {
  const actual = date
  actual.setUTCHours(0, 0, 0, 0)

  const radius = initialGap * msInAMonth
  return [actual.getTime(), radius]
}

function getPreviusWeekDate() {
  const prevWeekDate = new Date()

  prevWeekDate.setUTCDate(prevWeekDate.getUTCDate() - 7)
  return prevWeekDate
}

const timeUtils = {
  getWeekNumber,
  getMonthName,
  getMonthNumber,
  generateWeeksAYearAgo,
  getMonthsAYearAgo,
  getDayByMs,
  getWeekByMs,
  getDaysRange,
  getWeeksRange,
  getMonthsRange,
  getMonthByMs,
  initializeRangeWeeks,
  initializeRangeMonths,
  initializeRangeDays,
  getPreviusWeekDate
}

export default timeUtils
