function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Wechat-Auth-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.errno == 0) {
          resolve(res.data);
        } else {
          if (res.data.errmsg.length >= 8) {
            showToast(res.data.errmsg)
          } else {
            showErrorToast(res.data.errmsg)
          }
        }
      },  
      fail: function (err) {
        reject(err)
      }
    })
  });
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/icon_error.png',
    duration: 2000
  })
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 2000
  })
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  request,
  showErrorToast,
  showToast
}