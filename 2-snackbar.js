import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as s}from"./assets/vendor-BbbuE1sJ.js";document.querySelector(".form").addEventListener("submit",t=>{t.preventDefault();const o=parseInt(t.target.delay.value),i=t.target.state.value;new Promise((e,r)=>{setTimeout(()=>{i==="fulfilled"?e(o):r(o)},o)}).then(e=>{s.show({message:`✅ Fulfilled promise in ${e}ms`,position:"topRight",color:"green"})}).catch(e=>{s.show({message:`❌ Rejected promise in ${e}ms`,position:"topRight",color:"red"})})});
//# sourceMappingURL=2-snackbar.js.map
