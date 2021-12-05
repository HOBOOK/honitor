import Vue from 'vue'
import langDictionary from '../static/lang-dictionary.json'

// 공통(페이지 관련)
const common = {
  goRoute(route, param){
      if (router.app.$route.path !== route) {
          router.app.$router.push(route);
          store.state.param = {
              key:route,
              param: param
          }
          window.scrollTo(0,0);
      }
  },
  goLeafRoute(author, title){
      let route = '/tree/@' + author + '/' + title
      if (router.app.$route.path !== route) {
          router.app.$router.push(route);
          window.scrollTo(0,0);
      }
  },
  findLeafInRoot (root, select) {
      for (let i = 0; i < root.length; i++) {
          if(root[i].name !== null && root[i].name === select)
              return root[i]
          else {
              let leaf = this.findLeafInRoot(root[i].children, select)
              if(typeof leaf === 'undefined') continue
              return leaf
          }
      }
  },
  deleteLeafInRoot (root, select) {
      for (let i = 0; i < root.length; i++) {
          if(root[i].name !== null && root[i].name === select){
              root.splice(i, 1)
              return true
          }
          else {
              let leaf = this.deleteLeafInRoot(root[i].children, select)
              if(!leaf) continue
          }
      }
      return false
  },
  //숫자단위포멧 변환 함수
  convertNumberUnit(number){
      if(typeof number === 'undefined')
          return number
      let numStr = number.toString()
      if(numStr.length > 8) {
          return (number / 100000000).toFixed(1) + '억'
      } else if(numStr.length > 7) {
          return (number / 10000000).toFixed(1) + '천만'
      } else if(numStr.length > 4) {
          return (number / 10000).toFixed(1) + '만'
      } else if(numStr.length > 3) {
          return (number / 1000).toFixed(1) + '천'
      } else {
          return number
      }
  },
  //html 태그 제외한 텍스트 반환 함수
  replaceTag(html) {
      if(typeof html !== 'undefined') {
          let regExp = /<\/?[^>]+>/gi;
          return html.replace(regExp,"");
      }else {
          return html
      }
  },

  //jwt 검증
  verifyToken(token) {
      try{
          return jwt.verify(token, Config.SECRETKEY);
      }catch {
          return ''
      }
  },

  //글자수 영문,한글 구분
  getStringLength(str) {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
          if (escape(str.charAt(i)).length == 6) {
              len++;
          }
          len++;
      }
      return len;
  },

  //vuetify 컬러 가져오기
  getColor(key) {
      let mode = vuetify.framework.isDark ? "dark" : "light"
      return vuetify.framework.theme.themes[mode][key]
  }
}

// 시간 관련 함수
const time = {
    getTimeFromNow(date) {
        const now = new Date();
        now.setHours(now.getHours() - 9);
        const today = now
        const timeValue = new Date(date);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    },

    getElapsedTimeFromSecond(second){
      let min = Math.floor(second/60);
      let hour = Math.floor(min/60);
      let sec = second%60;
      min = min%60;

      let th = hour;
      let tm = min;
      let ts = sec;

      if(th<10){
        th = "0" + hour;
      }
      if(tm < 10){
        tm = "0" + min;
      }
      if(ts < 10){
        ts = "0" + sec;
      }

      return  th + ":" + tm + ":" + ts
    },
    dateToFormatKorean (date) {
      if(typeof date !== 'string') {
        return date[0] + '년 ' + date[1] + '월 ' + date[2] +'일'
      } else {
        let dateString = date.substring(0,10)
        return dateString.substring(0,4) + '년 ' + dateString.substring(5,7) + '월 ' + dateString.substring(8) +'일'
      }
      
    },
    dateTimeToFormatKorean (date) {
      if(typeof date !== 'string') {
        date = this.convertDateArrayToString(date)
      }
      var week = ['일', '월', '화', '수', '목', '금', '토'];
      var dayOfWeek = week[new Date(date).getDay()];
      return date.substring(0,4) + '년 ' + date.substring(5,7) + '월 ' + date.substring(8,10) +'일 ' + dayOfWeek + '요일 ' + date.substring(11,19)
    },
    dateShotToFormatKorean (date) {
      if(typeof date !== 'string') {
        return date[0] + '.' + date[1] + '.' + date[2]
      } else {
        let dateString = date.substring(0,10)
        return dateString.substring(0,4) + '.' + dateString.substring(5,7) + '.' + dateString.substring(8)
      }
    },
    simpleFormat(date){
      let data = new Date(date)
      return data.toLocaleDateString();
    },
    convertDateArrayToString(dateArray) {
      try{
        let date = dateArray[0] + "-" + this.addTimeBlank(dateArray[1]) + "-" + this.addTimeBlank(dateArray[2]) + "T" + this.addTimeBlank(dateArray[3])+":" + this.addTimeBlank(dateArray[4]) + ":" + this.addTimeBlank(dateArray[5])
        this.addTimeBlank(dateArray[3])
        return date
      }catch{
        return new Date().toLocaleTimeString()
      }
    },
    addTimeBlank(time) {
      return time.toString().length === 1 ? '0' + time : time.toString()
    }
}

// 유틸 함수
const utils = {
  // 소수점2자리까지의 바이트 단위로 변환시키는 함수
  convertByteToString(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  btoa(content) {
    return window.btoa(content)
  },

  // 클립보드 저장 함수
  copy(val) {
    if(val) {
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
  },
}

// 전역 변수
const properties = {
  getImageCdnUrl(key, w, h, q) {
    let url = 'https://d2q9yzkd471o7j.cloudfront.net/' + key + '?w=' + w + '&h=' + h + '&q=' + q 
    return url
  }
}

// 필터 함수
const regular = {
  basic(data){
    let reg=/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    return reg.test(data)
  },
  blankPatten(data){
    let blank_patten = /[\s]/g;
    return blank_patten.test(data)
  },
  passwordPatten(data){
    //영문,숫자,특수문자(!@$%^&* 만 허용) 9 이상
    let reg= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,}$/g
    return reg.test(data)
  },
  emailPatten(data){
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(data)
  },
  name(data){
    let reg =  /^[ㄱ-ㅎ가-힣a-zA-Z]+$/
    return reg.test(data)
  },
  number(data){
    let reg = /^[0-9]/
    return reg.test(data)
  }
}
  
// 언어 함수
const lang = {
  
  getString(key){
    let la = navigator.language || navigator.userLanguage
    if(la.indexOf('en')!==-1) {
      return  langDictionary['en'][key]
    } else {
      return  langDictionary['ko'][key]
    }
  }
}

// 파일 함수
const file = {
  upload (key, data) {
    if(typeof key === 'undefined' || key.length === 0){
        return
    }
    const formData = new FormData();
    formData.set('name', key);
    formData.append('file', data);
    window.axios.post('/s3/upload', formData, {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    .then((res)=>{
        console.log(res)
    })
    .catch((e)=>{
        console.error(e)
    })
  }
}




Vue.prototype.$common = common;
Vue.prototype.$time = time;
Vue.prototype.$utils = utils;
Vue.prototype.$regular = regular;
Vue.prototype.$lang = lang;
Vue.prototype.$file = file;
Vue.prototype.$properties = properties;

export default ({app}, inject) => {
  inject('common', common);
  inject('time', time);
  inject('utils', utils);
  inject('regular', regular);
  inject('lang', lang);
  inject('file', file);
  inject('properties', properties);
}
