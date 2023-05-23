<template>
  <div>
    <input type="text" v-model="selectedDate" @click="showCalendar">
    <div class="calendar" v-show="show">
      <div class="header">
        <button @click="previousMonth">&lt;</button>
        <h2>{{ currentMonth }}</h2>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="body">
        <div class="row">
          <div class="cell" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <div class="row" v-for="week in weeks" :key="week">
          <div class="cell" v-for="day in week" :key="day" @click="selectDate(day)">
            {{ day ? day.getDate() : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedDate: '',
      show: false,
      currentMonth: '',
      currentDate: null,
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weeks: []
    }
  },
  watch: {
    modelValue(value) {
      this.selectedDate = value;
      this.currentDate = new Date(value);
      this.currentMonth = this.getMonthName(this.currentDate);
      this.generateCalendar();
    }
  },
  created() {
    this.selectedDate = this.modelValue;
    this.currentDate = this.selectedDate ? new Date(this.selectedDate) : new Date();
    this.currentMonth = this.getMonthName(this.currentDate);
    this.generateCalendar();
  },
  methods: {
    getMonthName(date) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames[date.getMonth()];
    },
    generateCalendar() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay();
      const endDay = lastDay.getDay();
      const weeks = [];

      let day = 1;
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < startDay) {
            week.push(null);
          } else if (day > daysInMonth) {
            week.push(null);
          } else {
            const date = new Date(year, month, day);
            week.push(date);
            day++;
          }
        }
        weeks.push(week);
        if (day > daysInMonth) {
          break;
        }
      }

      this.weeks = weeks;
    },
    showCalendar() {
      this.show = true;
    },
    previousMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      this.currentDate = new Date(year, month - 1, 1);
      this.currentMonth = this.getMonthName(this.currentDate);
      this.generateCalendar();
    },
    nextMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      this.currentDate = new Date(year, month + 1, 1);
      this.currentMonth = this.getMonthName(this.currentDate);
      this.generateCalendar();
    },
    selectDate(date) {
      if (date) {
        this.selectedDate = date.toISOString().slice(0, 10);
        this.show = false;
        this.$emit('update:modelValue', this.selectedDate);
      }
    }
  }
}
</script>

<style>
.calendar {
  position: absolute;
  z-index: 1;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  top: 38px;
  left: 0;
  display: none;
}

.calendar .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.calendar .header button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  outline: none;
}

.calendar .header h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.calendar .body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar .row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 5px;
}

.calendar .cell {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
  cursor: pointer;
}

.calendar .cell:hover {
  background: #eee;
}
</style>
