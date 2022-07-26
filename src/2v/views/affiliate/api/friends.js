import apiClient from "@/services/api/client/apiClient";

export async function getAffiliateFriends() {
    const { message } = await apiClient.post('/affiliate/friends');

    return message;

    // return [
    //     {
    //         name: 'Дмитрий Сергеев',
    //         email: 'serg****@mail.ru',
    //         income: 25.00,
    //         level: 1
    //     },
    //     {
    //         name: 'Дмитрий Сергеев',
    //         email: 'serg****@mail.ru',
    //         income: 25.00,
    //         level: 1
    //     }
    // ]
}