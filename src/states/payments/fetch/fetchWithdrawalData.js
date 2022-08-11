// функция для получения стартовой даты для формы вывода
export async function fetchWithdrawalData(currencyCode, isLoading) {
    setTimeout(()=>{
        return{
            loading: false
        }
    },1000)
    return {
        usdtBalance: 1000,
        usdtBalanceFiat: 1000,
        isLoading: false
    };

}