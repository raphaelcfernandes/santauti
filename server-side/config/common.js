/**
 * Created by raphael on 2/2/17.
 */
var generalConfig = require('./generalConfig');
var privateKey = generalConfig.key.privateKey;
var CryptoJS = require('crypto-js');


exports.decrypt = function(password) {
    return decrypt(password);
};

exports.encrypt = function(password) {
    return encrypt(password);
};

// method to decrypt data(password)
function decrypt(password) {
    return CryptoJS.AES.decrypt(password, privateKey).toString(CryptoJS.enc.Utf8);
}


// method to encrypt data(password)
function encrypt(password) {
    return CryptoJS.AES.encrypt(password, privateKey);
}