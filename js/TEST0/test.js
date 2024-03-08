
// a = 'hxn.hexin.com'

// aa = a.split('.')[0]
// console.log(aa);


// r = aa === (true ? ('teacher' || 'hxn') : 'public')
// console.log(r);


//  上面是错的，关于 || 的问题


a = 'hxn.hexin.com'

aa = a.split('.')[0]
console.log(aa);


r = aa === (true ? 'teacher' : 'public') || aa === (true ? 'hxn' : 'public')
console.log(r);