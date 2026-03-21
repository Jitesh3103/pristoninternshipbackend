import fs from 'fs';

// Reading the data from file

// readfile
// readfileSync

// readfile

fs.readFile("readfile.txt", "utf-8", (err, filedata) => {
    if(filedata){
        console.log("Data read from the readfile.txt is",filedata);
    }
    else{
        console.log("Error in reading the file",err);
    }


});

// readfilesync

try{
    const fileData=fs.readFileSync("readfile.txt","utf-8");
    console.log("reading data using readFileSync",fileData);

}catch(error){
    console.log("readFileSyncError",error)
}

// write file mechanicms

// writerfile
// writefilesync

fs.writeFile("writeFile.txt","Hello this is added from server","utf-8",(err)=>{
    if(err){
        console.log("Error in file creation/writing the file",err);
    }
    else{
        console.log("Data Written to the file");
    }

})

fs.writeFileSync("writeFileSync.txt","This is written using write filesync","utf-8");
console.log("File created using write file sync ")

// updating the contents of the file
// appendfile()

fs.appendFile("writeFile.txt","\n Newly added by appendfile func","utf-8",(err,data)=>{
    if(err)
    {
        console.log("File updation failed");

    }else{
        console.log("File updated successfully!");
    }
})

