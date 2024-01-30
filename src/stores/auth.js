import router from "../router";
import axios from "axios";
import { defineStore } from "pinia";
import cookies from "vue-cookies";
import userJson from '../data/user.json';

export const authStore = defineStore("auth", {
    state: () => ({
        userInfo: null
    }),
    getters: {
        getUserInfo: (state) => state.userInfo
    },
    actions: {
        async getUser() {
            await axios.get("/ext_be/api/user-info", {
            }).then((res) => {
                this.userInfo = res.data;
            }).catch((res) => {
                cookies.remove('PHPSESSID');
                cookies.userInfo = null;
                window.location.href = import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL;
            })
        },
        async userExit() {
            cookies.remove('PHPSESSID');
            this.userInfo = null;
            window.location.href = import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL;
        },
        getUserDev() {
            this.userInfo = userJson;
        },
        async userExitDev() {
            this.userInfo = null;
            router.push('/user-login');
        }
    }
})