// функция для получения стартовой даты для формы вывода
export async function fetchWithdrawalData(currencyCode) {
    await new Promise(function(resolve, reject) {
        console.log(currencyCode);
    });
    return {
        usdtBalance: 1000,
        usdtBalanceFiat: 1000,
        isLoading: false
    };

}