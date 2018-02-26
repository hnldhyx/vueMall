<!-- 一个使用vue切换nav的示例 -->
<template>
    <div class="nav-demo">
        <div class="nav-demo-tabs">
            <ul class="clearfix">
                <li v-for="(tab, index) in tabs" @click="tabToggle(tab.component)">{{tab.title}}</li>
            </ul>
        </div>
        <div class="nav-demo-content">
            <!-- 不需重复渲染（只是显隐切换）时，外面套一层keep-alive标签 -->
            <keep-alive>
                <component :is="navComponent"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import NavComponent1 from './nav_demo_components/NavComponent1.vue'
    import NavComponent2 from './nav_demo_components/NavComponent2.vue'
    export default {
        name: 'NavDemo',
        data(){
            return {
                tabs: [{
                    'title': 'tab1',
                    'component': 'nav-component1'
                },{
                    'title': 'tab2',
                    'component': 'nav-component2'
                }],
                navComponent: 'nav-component1'
            }
        },
        components: {
            'nav-component1': NavComponent1,
            'nav-component2': NavComponent2
        },
        methods: {
            tabToggle(component){
                this.navComponent = component;
            }
        }
    }
</script>

<style scoped lang="scss">
.nav-demo{
    margin: 20px 0;
    .nav-demo-tabs{
        li{
            float: left;
            color: #000;
            width: 100px;
            text-align: center;
            line-height: 24px;
            background: rgba(100,100,100,.2);
            margin: 0 10px;
            cursor: pointer;

            &:hover{
                background: rgba(60,60,60,.2);
            }
        }
    }
}
</style>
