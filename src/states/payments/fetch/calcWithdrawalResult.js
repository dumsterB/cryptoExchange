// функция для получения результата вывода
export async function calcWithdrawalResult(amount, currencyCode) {
    console.log(amount, currencyCode);
    // потом тут будет вызов к апи
    
    return {
        netSum: 1000, // сумма которую получит клиент
        psFee: 10, // Комиссия посредника  
        serviceFee: 5 // Комиссия Whitex
    };
}