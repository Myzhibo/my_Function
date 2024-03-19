// public/index.html 加id
// <link id="icon-link" rel="icon" href="<%= BASE_URL %>favicon_hexin.png">’


// main.js修改网页图标
document.addEventListener('DOMContentLoaded', (event) => {
  const iconLink = document.getElementById('icon-link');
  if (iconLink) {
    let iconPath = '/favicon_hexin.png';
    if (window.location.hostname.includes('hxn')) {
      iconPath = '/favicon_hexin2.jpg';
    }
    iconLink.href = iconPath;
  }
});