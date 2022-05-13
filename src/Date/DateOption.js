const DateOption = {
    now:()=>{
      let t = new Date()
      let newdate = new Date(t)
      newdate.setHours(newdate.getHours()-24)
      return newdate
    },
    beforDays:()=>{
        let today = new Date()
        let y = new Date(today)
        y.setDate(y.getDate() - 1)
        return y
    },
    threeDays:()=>{
        let today = new Date()
        let y = new Date(today)
        y.setDate(y.getDate() - 3)
        return y
    },
    sevenDays:()=>{
        let today = new Date()
        let days = new Date(today)
        days.setDate(days.getDate() - 7)
        return days
    },
    oneMonth:()=>{
        let today = new Date()
        let month = new Date(today);
        month.setMonth(month.getMonth()-1)
        return month
    },
    sixMonth:()=>{
        let today = new Date()
        let month = new Date(today);
        month.setMonth(month.getMonth()-6)
        return month
    },
    oneYear:()=>{
        let today = new Date()
        let month = new Date(today);
        month.setMonth(month.getMonth()-12)
        return month
    }
}

export default DateOption