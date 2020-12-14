module.exports = function O(classObj){
 return Object.getOwnPropertyNames(classObj).reduce((a, b) => {
       
    a[b] = typeof classObj[b] === "object" ? JSON.stringify(O(classObj[b])) : classObj[b];
        return a;
    }, {});
}