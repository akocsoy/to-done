import store from "./store"
const sleep = (time)=> new Promise(resolve => setTimeout(resolve, time))
async function animate(){
    let docArray= document.getElementById("title").children
    let charArray = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let title= ["T","O","-","D","O","N","E"]
    // eslint-disable-next-line
    while(true){
            for(let i=0;i<docArray.length;i++){
                if(docArray[i].innerText != "-"){
                    docArray[i].innerText = charArray[Math.floor(Math.random()*charArray.length)]
                    await sleep(5)
                }      
            }
        await sleep(10)
        if(store.state.titleFlag){
            for(let j=0;j<docArray.length;j++){
                docArray[j].innerText = title[j]
            }
            return
        }     
    }
}
export default animate