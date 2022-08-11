import { useField, useForm } from 'vee-validate';
import { reactive, ref } from 'vue';


export async function useWithdrawalValidation(usdtBalance) {
    // check in documentation
    let require = 'requiredField'
    // let checker = 'sumChecker'
            if (usdtBalance) {
                console.log(usdtBalance);
            }
    if (!usdtBalance) {
        return  require
    }

    const {
        value: usdtInputValue,
        errorMessage: sumError
    } = useField('usdtInputValue');

    // const confirm = handleSubmit(confirmCallback);

    return {
        usdtInputValue,
        sumError,
        confirm
    };
}