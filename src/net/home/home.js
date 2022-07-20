import { requestLCAPI } from "./request.js"

export function getAllUserInfo() {
    return requestLCAPI({
        url: '/all_user_infos',
        params: {
        }
    })
}

export function getAllUserProgress(startTime) {
    return requestLCAPI({
        url: '/all_user_progresses'+'/'+startTime,
    })
}
export function getUserRecentSubmit(userId) {
    return requestLCAPI({
        url: '/latest_ac_submissions'+'/'+userId,
    })
}
