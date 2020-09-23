// 本地存儲模塊

export const  getItem = (name)=>{
 var data =  localStorage.name ;
 //data有可能不是json字符串因此做個try...catch判斷
 try{
  return JSON.parse(data);
 }catch(err){
  return data;
 }
}


export const setItem = (key,value)=>{
  if(typeof value === 'object'){
    value = JSON.stringify(value);
  }
  localStorage.setItem(key , value);
}


export const removeItem = ()=>{

}