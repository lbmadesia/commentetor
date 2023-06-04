const fs = require('fs').promises;


 const commentetor = (path) => {
    return new Promise(async (resolve, reject) => {
        try {
            const file = await fs.readdir(path);
            for (let i = 0; i < file.length; ++i) {
                ;
                const checker = await fs.lstat(path + file[i]);
                if (checker.isFile()) {
                  const data =  await fs.readFile(path + file[i],"utf8");
                  const  arr1 = data.split("function ");
                  let arr2 =  arr1[0];
                
                  console.log("arr1 ==",arr1,arr1.length);
                  for (let j = 1; j < arr1.length; ++j) {
                    const slag = arr1[arr1.length-1].split('\r\n');
                    if(!slag[slag.length-1].match(/\(/)){
                    let phelp = arr1[j].split('\r\n');
                    const phelp2 = phelp[0].split('(');
                    const phelp3 = phelp2[1].split(')');
                    const phelp4 = phelp3[0].split(',');
                    let parameters = '';
                        phelp4.forEach(element => {
                            if(element.trim() != '')
                                parameters +="\r\n * @param {*} "+element;
                    });
                    arr2 +=`/** \r\n * Write description here \r\n * @function ${phelp2[0]} ${parameters} \r\n * @returns {*} \r\n*/ \r\nfunction ${arr1[j]}`;           
                  }  
                }
                  await fs.writeFile(path + file[i],arr2);
            
                }
                else {
                    // await routeAccess(path + file[i]+'/');
                }
            };
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = commentetor;