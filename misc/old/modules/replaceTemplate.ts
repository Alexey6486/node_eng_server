module.exports = (temp, item) => {
    let output = temp.replace(/{%NAME%}/g, item.name);
    output = output.replace(/{%PROFESSION%}/g, item.profession);
    output = output.replace(/{%ID%}/g, item.id);
    return output;
};