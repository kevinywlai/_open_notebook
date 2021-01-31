
// RegExp.prototype.exec()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec

const regex1 = RegExp(/\d{2,4}/, 'g');
const str1 = '2021/01/31';
let array1;

while ((array1 = regex1.exec(str1)) !== null) {
    console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);

}