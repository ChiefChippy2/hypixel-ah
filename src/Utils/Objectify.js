module.exports = function(classObj){
 return Object.getOwnPropertyNames(classObj).reduce((a, b) => {
       
    a[b] = typeof classObj[b] === "object" ? this(classObj[b]) : classObj[b];
        return a;
    }, {});
}