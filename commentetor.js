const fs = require('fs').promises;


 const commentetor = (path) => {
    return new Promise(async (resolve, reject) => {
        try {
            const file = await fs.readdir(path);
            for (let i = 0; i < file.length; ++i) {
                const checker = await fs.lstat(path + file[i]);
                if (checker.isFile()) {
                  const data =  await fs.readFile(path + file[i],"utf8");
                  const  arr1 = data.split("function ");
                  console.log(arr1);
                  let arr2 =  arr1[0];
                  let description = 'Write description here ';
                  for (let j = 1; j < arr1.length; ++j) {
                    const slag = arr1[j-1].split('\r\n');
                    if(slag[slag.length-1].match(/\(/)  || slag[slag.length-1].match(/\* @/) || slag[slag.length-1].match(/\*@/) || slag[slag.length-2].match(/\*\//) || slag[slag.length-3].match(/\*\//)){
                        arr2+=`function ${arr1[j]}`;
                        console.log("skippppppp");
                    } 
                    else{
                        // start commenting code to revoke
                        let arr2help = arr2.split('\r\n');
                        if(slag[slag.length-2] && slag[slag.length-2].match('//')){
                        
                        arr2help[arr2help.length-2]= '';
                        const dhelp = slag[slag.length-2].split('//');
                        description = dhelp[1] ? dhelp[1] : 'Write description here ';
                        console.log("description 1");
                    }
                    else if(slag[slag.length-3] && slag[slag.length-3].match('//')){
                        arr2help[arr2help.length-3]= '';
                        const dhelp = slag[slag.length-3].split('//');
                        description = dhelp[1] ? dhelp[1] : 'Write description here ';
                        console.log("description 2");
                    }
                    arr2='';
                    for(let k=0;k<arr2help.length;++k)
                    {
                        arr2 = (k==arr2help.length)? arr2+arr2help[k]+'\r\n': arr2+arr2help[k]+'\r\n';
                    }
                    // start commenting code to revoke
                    let phelp = arr1[j].split('\r\n');
                    const phelp2 = phelp[0].split('(');
                    const phelp3 = phelp2[1] ? phelp2[1].split(')') : [];
                    const phelp4 = phelp3[0] ? phelp3[0].split(',') : [];
                    let parameters = '';
                        phelp4.forEach(element => {
                            if(element.trim() != '')
                                parameters +="\r\n * @param {*} "+element;
                    });
                    arr2 +=`/** \r\n * ${description} \r\n * @function ${phelp2[0]} ${parameters} \r\n * @returns {*} \r\n*/ \r\nfunction ${arr1[j]}`;           
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
