const fs = require('fs');

// const text = fs.readFileSync('./text.txt', 'utf-8');
// const textNew = `new words ${text}`;
// fs.writeFileSync('./textNew.txt', textNew);

fs.readFile('./text2.txt', 'utf-8', (err, data) => {
    console.log('next message will be from file text3.txt');
    fs.readFile(`./${data}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.writeFile(`./asyncText.txt`, `${data}\r\n${data2}`, err => {
            console.log('new file created')
        });
    });
});
console.log('this line is the first to be displayed')
