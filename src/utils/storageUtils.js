/* eslint-disable import/no-anonymous-default-export */ /*  - 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。 */
import store from 'store'

import {USER_KEY} from './constants'

export default {

    saveUser(user) {
        store.set(USER_KEY, user)
    },

    getUser() {
        return store.get(USER_KEY)
    },

    removeUser() {
        store.remove(USER_KEY)
    }
}