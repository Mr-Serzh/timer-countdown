const daysEl = document.querySelector('span[data-value="days"]');
const hoursEl = document.querySelector('span[data-value="hours"]');
const minsEl = document.querySelector('span[data-value="mins"]');
const secsEl = document.querySelector('span[data-value="secs"]');

class CountdownTimer {
  constructor({ targetDate } = {}) {
    this.targetDate = targetDate;
    this.init();
  }

  init() {
    this.getDeltaTime();
    setInterval(() => {
      this.getDeltaTime();
    }, 1000);
  }

  getDeltaTime() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    this.getTimeComponents(deltaTime);
  }
 
  /*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается часов/минут/секунд
   * - Возвращает обьект со свойствами days, hours, mins, secs
   */
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.timerFace(days, hours, mins, secs)
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

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 10, 2020'),
});