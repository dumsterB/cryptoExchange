
export async function confirmWithdrawalData(data) {
    await new Promise(function(resolve, reject) {
        console.log(data);
    });
    return {
        usdtBalance: 1000,
        usdtBalanceToken: 1000,
    };

}