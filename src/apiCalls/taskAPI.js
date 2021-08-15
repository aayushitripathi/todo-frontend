
export const taskapiCall = async (url, taskObj = {}) => {
    try{
   const response = await fetch(url, taskObj);
   const data = await response.json();
   const taskData = await data.data;

   return taskData;
    }
    catch(err){
        console.log(err);
    }
  }

