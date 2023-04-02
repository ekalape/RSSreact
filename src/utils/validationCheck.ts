/* eslint-disable prettier/prettier */

export type SetErrorFnType = (errName: string, errValue: string) => void;
function validationTextInputCheck(
    errorName: string,
    value: string | undefined,
    setError: SetErrorFnType
) {
    if (!value) {
        setError(errorName, 'This field is required');
        return false;
    }
    if (value.length < 3) {
        setError(errorName, 'Should be 3+ letters length');
        return false;
    }
    if (!/[A-Z][a-z]{2,}/.test(value)) {
        setError(errorName, 'Should start with capital letter');
        return false;
    }

    setError(errorName, '');
    return true;
}

function validationDateCheck(errorName: string,
    value: string | undefined,
    setError: SetErrorFnType) {
    if (!value) {
        setError(errorName, 'The date is required');
        return false;
    } else setError(errorName, '');
    return true;
}

function validationFileCheck(errorName: string,
    value: string | undefined,
    setError: SetErrorFnType) {
    if (!value) {
        setError(errorName, 'You have to upload a file');
        return false;
    } else setError(errorName, '');
    return true;
}
function validationCheckboxCheck(errorName: string,
    checkedValue: boolean | undefined,
    setError: SetErrorFnType) {
    if (checkedValue === false) {
        setError(errorName, 'This check is required');
        return false;
    } else setError(errorName, '');
    return true;
}
function validationSelectCheck(errorName: string,
    value: string | undefined,
    setError: SetErrorFnType) {
    if (value === "-") {
        setError(errorName, 'You have to choose an option');
        return false;
    } else setError(errorName, '');
    return true;
}

function validationCheck(errorName: string,
    value: string | undefined,
    setError: SetErrorFnType,
    checkedValue?: boolean | undefined) {
    switch (errorName) {
        case "firstNameError":
        case "lastNameError":
        case "cityError": return validationTextInputCheck(errorName, value, setError);
        case "dateError": return validationDateCheck(errorName, value, setError);
        case "fileInputError": return validationFileCheck(errorName, value, setError);
        case "agreeCheckError":
        case "genderError": return validationCheckboxCheck(errorName, checkedValue, setError);
        case "hairColorError":
        case "eyeColorError":
        case "hairTypeError":
            return validationSelectCheck(errorName, value, setError);
    }

    return false;
}


export default validationCheck;
