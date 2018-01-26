import LoadingComponent from './Loading.vue'

const loading = {
    install(Vue){
        Vue.component('ui-loading', LoadingComponent)
    }
}

export default loading;