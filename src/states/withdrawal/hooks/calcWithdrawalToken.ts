// функция для получения результата вывода
export async function calcWithdrawalToken(token: Object, sum: number) {
    const psFee: number = 10;
    const serviceFee: number = 5;
    let netSum = 0;
    if(sum > netSum){
        netSum = sum - psFee - serviceFee;
    }
    // потом тут будет вызов к апи

    return {
        netSum, // сумма которую получит клиент
        feeAgent: 5, // Комиссия посредника
        feeWhitex: 10 // Комиссия Whitex
    };
}