module.exports = function O(classObj){
    return Object.getOwnPropertyNames(classObj).reduce((a, b) => {
       if(Array.isArray(classObj[b])) a[b]= classObj[b].map(x=>typeof x==="Function"?O(x):x);
       else a[b] = typeof classObj[b] === "object" ? JSON.stringify(O(classObj[b])) : classObj[b];
           return a;
       }, {});
   }