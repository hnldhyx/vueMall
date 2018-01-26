<template>
    <div class="cart">
        <mall-header></mall-header>
        <div>这是购物车页面</div>
        <mall-footer></mall-footer>
    </div>
</template>

<script>
    import MallHeader from '../components/MallHeader.vue'
    import MallFooter from '../components/MallFooter.vue'
    export default {
        name: 'cart',
        components: {
            'mall-header': MallHeader,
            'mall-footer': MallFooter
        }
    }
</script>