import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

export const app = new Vue({
  el: '#app',

  data: {
    meetupData: null,
    defAgendaTitles: {
      registration: 'Регистрация',
      opening     : 'Открытие',
      break       : 'Перерыв',
      coffee      : 'Coffee Break',
      closing     : 'Закрытие',
      afterparty  : 'Afterparty',
      talk        : 'Доклад',
      other       : 'Другое',
    },
    agendaIcons: {
      registration: 'key',
      opening     : 'cal-sm',
      talk        : 'tv',
      break       : 'clock',
      coffee      : 'coffee',
      closing     : 'key',
      afterparty  : 'cal-sm',
      other       : 'cal-sm',
    },
    loading: true,
    apiUrl : API_URL
  },

  async mounted() {
    this.meetupData = await this.getMeetupData()
    this.loading = false
  },

  computed: {
    //преобразование даты. не совсем понятно, есть ли тут выигрыш в чем-то,
    //будет ли computed свойство пересчитываться каждый раз при обращении...
    //но что точно - шаблон становится чище
    updatedMeetupData: function(){
      if(!this.meetupData) return null
      return {
        ...this.meetupData,
        date      : this.getLocaleDateTime(this.meetupData.date, 'date'),
        bgImageUrl:
          this.meetupData.imageId
          ?
            {'--bg-url': `url(${this.getMeetupCoverLink()})`}
          :
          null
      }
    }
  },

  methods: {
    async getMeetupData(){
      return await fetch(API_URL + '/meetups/' + MEETUP_ID)
                    .then(res => res.json())
    },
    getLocaleDateTime(timestamp, type = 'date'){
      const options = {}
      if(type === 'date'){
        options.year  = 'numeric'
        options.month = 'long'
        options.day   = 'numeric'
      } else if(type === 'time'){
          options.hour   = 'numeric'
          options.minute = 'numeric'
      }
      return new Date(timestamp).toLocaleString('ru-RU', options)
    },
    getMeetupCoverLink(){
      return `${API_URL}/images/${this.meetupData.imageId}`
    }
  },
});
