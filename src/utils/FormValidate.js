import Languages from '@/commons/Languages';
import Validate from './Validate';

const validateEmoji = (username) => {
    return /!(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
        username
    );
};
const validateNumber = (username) => {
    const reg = /^([^0-9]*)$/;
    return reg.test(username);
};
const validatePwd = (username) => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return reg.test(username);
};
const validateEmail = (email) => {
    return email.match(
        /^(([a-zA-Z-\-0-9- ]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validateSpecialCharacters = (username) => {
    const reg = /^[a-zA-Z- ]+$/;
    return reg.test(removeAscent(username));
};

const validateSpecialCharactersTaxId = (value) => {
    const reg = /^[a-zA-Z-\-0-9- ]+$/;
    return reg.test(value);
};

const uppercaseCharacters = (value) => {
    const reg = /^([^A-Z]*)$/;
    return reg.test(value);
};

const lowerCharacters = (value) => {
    const reg = /^([^a-z]*)+$/;
    return reg.test(value);
};

const specialCharacters = (value) => {
    const reg = /^([^@$!%*?&#^]*)+$/;
    return reg.test(value);
};

const min8Characters = (value) => {
    const reg = /^[A-Za-z\d@$!%*?&#^]{8,}$/;
    return reg.test(removeAscent(value));
};

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}
const validatePhone = (username) => {
    const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return reg.test(username);
};
function userNameValidate(userName) {
    let errMsg = '';
    if (userName.length < 8) {
        errMsg = Languages.errorMsg.userNameLength;
    } else if (!validateEmoji(userName) && !validateNumber(userName)) {
        errMsg = Languages.errorMsg.userNameRegex;
    } else if (!validateSpecialCharacters(userName)) {
        errMsg = Languages.errorMsg.userNameRegex;
    }
    return errMsg;
}
function userNameValidateSignUp(userName) {
    let errMsg = '';
    if (Validate.isStringEmpty(userName)) {
        errMsg = Languages.errorMsg.userNameRequired;
    } else if (userName.length < 8) {
        errMsg = Languages.errorMsg.userNameLength;
    }
    return errMsg;
}

function emailValidate(email) {
    let errMsg = '';
    if (!validateEmail(email)) {
        errMsg = Languages.errorMsg.emailRegex;
    }
    return errMsg;
}
function cardValidate(card) {
    let errMsg = '';
    if (Validate.isStringEmpty(card)) {
        errMsg = Languages.errorMsg.cardNull;
    } else if (validateNumber(card)) {
        errMsg = Languages.errorMsg.cardRegex;
    } else if (card.length < 9 || card.length > 12) {
        errMsg = Languages.errorMsg.cardCheck;
    }
    return errMsg;
}

function passValidate(pwd) {

    let errMsg = '';

    if (Validate.isStringEmpty(pwd)) {
        errMsg = Languages.errorMsg.pwdNull;
        console.log(pwd)
    } else if (pwd.length < 8) {
        errMsg = Languages.errorMsg.pwdCheck;
    } else if (!validatePwd(pwd)) {
        errMsg = Languages.errorMsg.errIllegal;
    }
    return errMsg;
}
function passConFirmValidate(pwd, conFirmPwd) {
    let errMsg = '';
    if (Validate.isStringEmpty(conFirmPwd)) {
        errMsg = Languages.errorMsg.pwdNull;
    } else if (pwd !== conFirmPwd) {
        errMsg = Languages.errorMsg.conFirmPwd;
    }
    return errMsg;
}

function passConFirmPhoneAndEmail(phone) {
    let errMsg = '';

    if (Validate.stringIsNumberOnly(phone)) {

        if (Validate.isStringEmpty(phone)) {
            errMsg = Languages.errorMsg.phoneIsEmpty;
        } else if (!validatePhone(phone)) {
            errMsg = Languages.errorMsg.phoneRegex;
        } else if (phone.length < 10 || phone.length > 10) {
            errMsg = Languages.errorMsg.phoneCount;
        }
    }
    else {

        if (!validateEmail(phone)) {
            errMsg = Languages.errorMsg.emailRegex;
        }
    }

    return errMsg;
}

function passConFirmPhone(phone) {
    let errMsg = '';

    if (Validate.isStringEmpty(phone)) {
        errMsg = Languages.errorMsg.phoneIsEmpty;
    } else if (!validatePhone(phone)) {
        errMsg = Languages.errorMsg.phoneRegex;
    } else if (phone.length < 10 || phone.length > 10) {
        errMsg = Languages.errorMsg.phoneCount;
    }

    return errMsg;
}

function inputNameEmpty(value, errEmpty, errCharacters) {
    let errMsg = '';
    if (Validate.isStringEmpty(value)) {
        errMsg = errEmpty;
    } else if (!validateSpecialCharacters(value)) {
        errMsg = errCharacters;
    }
    return errMsg;
}

function inputContentEmpty(value) {
    let errMsg = '';
    if (Validate.isStringEmpty(value)) {
        errMsg = Languages.errorMsg.required;
    }
    return errMsg;
}

function inputValidate(
    value,
    errEmpty,
    errSyntax,
    numOperator
) {
    let errMsg = '';
    const number = numOperator || 16;

    if (Validate.isStringEmpty(value)) {
        errMsg = errEmpty;
    } else if (value.length > number) {
        errMsg = errSyntax;
    }
    return errMsg;
}
function taxCodeValidate(value, errEmpty, errSyntax, errCharacters) {
    let errMsg = '';
    if (value.length < 10) {
        errMsg = errSyntax;
    } else if (!validateSpecialCharactersTaxId(value)) {
        errMsg = errCharacters;
    }
    return errMsg;
}
function birthdayValidator(value) {
    let errMsg = '';
    const regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/; // add anchors; use literal
    const regexVarTest = regexVar.test(value); // pass the string, not the Date
    const userBirthDate = new Date(value.replace(regexVar, '$3-$2-$1')); // Use YYYY-MM-DD format
    const todayYear = new Date().getFullYear(); // Always use FullYear!!
    const cutOff19 = new Date(); // should be a Date
    cutOff19.setFullYear(todayYear - 18); // ..
    const cutOff95 = new Date();
    cutOff95.setFullYear(todayYear - 95);
    if (Validate.isStringEmpty(value)) {
        errMsg = Languages.errorMsg.birthdayEmpty;
    } else if (!regexVarTest) {
        // Test this before the other tests
        errMsg = Languages.errorMsg.birthdayNotNumber;
    } else if (userBirthDate > cutOff19) {
        errMsg = Languages.errorMsg.birthdayAge18;
    } else if (userBirthDate < cutOff95) {
        errMsg = Languages.errorMsg.birthdayAge95;
    } else {
        errMsg = '';
    }
    return errMsg;
}

function checkOldPwd(oldPass) {
    let err = '';
    if (Validate.isEmpty(oldPass)) {
        err = Languages.errorMsg.errMsgEmpty;
    } else if (oldPass.length < 8) {
        err = Languages.errorMsg.errMsgLength;
    }
    return err;
}

function checkNewPwd(newPass) {
    let err = '';
    if (Validate.isEmpty(newPass)) {
        err = Languages.errorMsg.errMsgEmpty;
    } else if (newPass.length < 8) {
        err = Languages.errorMsg.errMsgLength;
    } else if (Validate.checkSpaceChar(newPass)) {
        err = Languages.errorMsg.errMsgSpaceChar;
    } else if (Validate.checkSpecialChar(newPass)) {
        err = Languages.errorMsg.errMsgSpecialChar;
    }
    return err;
}

function checkCurrentPwd(newPass, currentNewPwdChecked) {
    let err = '';
    if (Validate.isEmpty(currentNewPwdChecked)) {
        err = Languages.errorMsg.errMsgEmpty;
    } else if (currentNewPwdChecked.length < 8) {
        err = Languages.errorMsg.errMsgLength;
    } else if (newPass !== currentNewPwdChecked) {
        err = Languages.errorMsg.errMsgCurrentPwdCompare;
    }
    return err;
}
export default {
    userNameValidate,
    emailValidate,
    cardValidate,
    passValidate,
    passConFirmValidate,
    passConFirmPhoneAndEmail,
    passConFirmPhone,
    inputValidate,
    birthdayValidator,
    checkOldPwd,
    checkCurrentPwd,
    checkNewPwd,
    taxCodeValidate,
    inputNameEmpty,
    userNameValidateSignUp,
    uppercaseCharacters,
    lowerCharacters,
    specialCharacters,
    min8Characters,
    validateNumber,
    inputContentEmpty
};