import Vue from 'vue'
import Router from 'vue-router'
import PhoneBookTable from '@/components/PhoneBookTable'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'PhoneBookTable',
            component: PhoneBookTable
        },
    ]

})



