const template = require('./00_template');

exports.signUpPage = function () {
    return `
    ${template.header()}
    ${template.headNavBar()}
    
    ${template.footNavBar()}
    ${template.footer()}
    `
}