import apiClient from "@/services/api/client/apiClient";

export async function getAffiliateInfo() {
    const { message } = await apiClient.post('/affiliate/info');

    return message;

    // return {
    //     code: '370641523',
    //     income: 0,
    //     allFriends: 0,
    //     activeFriends: 0
    // }
}