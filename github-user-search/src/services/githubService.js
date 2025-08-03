import axios from "axios"

export const fetchUserData = async (username) => {
    try {
        const getResponse = await axios.get(`https://api.github.com/users/${username}`)
        console.log(getResponse)
        return getResponse.data
    } catch (error) {
        console.log(axios.isAxiosError(error))
        return axios.isAxiosError(error)
    }


}

