<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <!-- <a href="/">Home</a> -->
                <router-link to="/">Home</router-link>
                <span><slot></slot></span>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoodsBread'
    }
</script>

