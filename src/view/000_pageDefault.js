const template = require('./00_template');

exports.signUpPage = function ( children ) {
    return `
    ${template.header()}
    ${template.headNavBar()}
    
    ${children}
    
    
    ${template.footNavBar()}
    ${template.footer()}
    `
}