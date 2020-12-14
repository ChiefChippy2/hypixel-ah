module.exports = function O(classObj){
 return Object.getOwnPropertyNames(classObj).reduce((a, b) => {
    if(Array.isArray(classObj[b])) return classObj[b].map(x=>typeof x==="Function"?O(x):x);
    a[b] = typeof classObj[b] === "object" ? JSON.stringify(O(classObj[b])) : classObj[b];
        return a;
    }, {});
}