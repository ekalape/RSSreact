/* eslint-disable prettier/prettier */
function validationCheck(
    errorName: string,
    value: string | undefined,
    setError: (errName: string, errValue: string) => void
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

export default validationCheck;
