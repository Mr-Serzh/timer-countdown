const daysEl = document.querySelector('span[data-value="days"]');
const hoursEl = document.querySelector('span[data-value="hours"]');
const minsEl = document.querySelector('span[data-value="mins"]');
const secsEl = document.querySelector('span[data-value="secs"]');

class CountdownTimer {
  constructor({ targetDate } = {}) {
    // Перевіряємо, чи targetDate задано
    if (!targetDate) {
      console.error('Error: Please provide a targetDate for the CountdownTimer.');
      return;
    }

    this.targetDate = targetDate;
    this.init();
  }

  init() {
    this.updateTimer();
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const currentTime = new Date();
    const deltaTime = this.targetDate - currentTime;

    if (deltaTime <= 0) {
      // Зуптняємо таймер коли targetDate is reached
      clearInterval(this.intervalId);

      // Отримуємо новий targetDate на наступний рік (11 грудня)
      const nextYear = currentTime.getFullYear() + 1;
      const nextTargetDate = new Date(nextYear, 11, 11);

      // Створюємо новий CountdownTimer з новим targetDate
      new CountdownTimer({
        targetDate: nextTargetDate,
      });
    } else {
      this.getTimeComponents(deltaTime);
    }
  }

  /*
   * - Прймає час в мілісекундах
   * - Вираховує скільки в них поміщається годин/хвилин/секунд
   * - Повертає об'єкт з властивостями days, hours, mins, secs
   */
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.timerFace(days, hours, mins, secs);
  }

  // Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
  pad(value) {
    return String(value).padStart(2, '0');
  }

  timerFace(days, hours, mins, secs) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minsEl.textContent = `${mins}`;
    secsEl.textContent = `${secs}`;
  }
}

// Встановлюємо targetDate на рік після поточної дати
const currentDate = new Date();
const targetDate = new Date(currentDate.getFullYear(), 11,  10);

new CountdownTimer({
  targetDate,
});