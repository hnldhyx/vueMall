<template>
    <div>
        <!-- nav demo（一个使用vue切换nav的示例） -->
        <!-- <nav-demo></nav-demo> -->

        <!-- header -->
        <mall-header @loginInfo="_checkLogStatus" :cartCount="cartCount"></mall-header>
        <!-- 面包屑 -->
        <goods-bread></goods-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="_showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd @click="_setPriceFilter('all')">
                                <a href="javascript:void(0)" :class="{cur:priceChecked == 'all'}">All</a>
                            </dd>
                            <dd v-for="(price,index) in priceFilterBy" :key="index" @click="_setPriceFilter(index)">
                                <a href="javascript:void(0)" v-if="price.endPrice" :class="{cur:priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
                                <a href="javascript:void(0)" v-else :class="{cur:priceChecked == index}">{{price.startPrice}}以上</a>
                            </dd>
                        </dl>
                    </div>
                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item) in displayedList" :key="item.productId" :data-id="item.productId">
                                    <div class="pic">
                                        <a href="javascript:"><img v-lazy="'static/' + item.productImg" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.productPrice | formatMoney}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="_addToCart(item)" v-if="!item.hasCarted">加入购物车</a>
                                            <a href="javascript:;" class="btn btn--m" @click="_removeFromCart(item)" v-if="item.hasCarted">移出购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer -->
        <mall-footer></mall-footer>
        <div class="md-overlay" v-if="overlay" @click="_closeFilterPop"></div>
        <ui-loading v-if="uiLoadingFlag"></ui-loading>
    </div>
</template>

<script>

    import axios from 'axios'

    // 一个使用vue切换nav的示例
    import NavDemo from '../components/NavDemo.vue'

    import MallHeader from '../components/MallHeader.vue'
    import MallFooter from '../components/MallFooter.vue'

    import GoodsBread from '../components/GoodsBread.vue'

    export default {
        name: 'goodsList',
        data(){
            return {
                goodsData: [],
                displayedList: [],
                priceFilterBy: [{
                    'startPrice': '0',
                    'endPrice': '100'
                },{
                    'startPrice': '100',
                    'endPrice': '500'
                },{
                    'startPrice': '500',
                    'endPrice': '1000'
                },{
                    'startPrice': '1000',
                    'endPrice': '2000'
                },{
                    'startPrice': '2000'
                }],
                hasLogin: false, //判断是否登录
                priceChecked: 'all', //控制选择某一项价格筛选项的样式
                uiLoadingFlag: false, //控制loading的显隐
                filterBy: false, //控制小屏幕下价格筛选框显隐
                overlay: false, //控制遮罩层的显隐
                cartCount: 0
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.uiLoadingFlag = true;
                setTimeout(() => {
                    this._getList();
                }, 500)
            })
        },
        methods: {
            _getList(){
                axios.get('/goodsData').then(rsp => {
                    this.uiLoadingFlag = false;
                    let res = rsp.data;
                    if(res.status == 0){
                        this.goodsData = res.result;
                        this.displayedList = this.deepClone(true, [], this.goodsData);
                        let cartCount = 0;
                        for(let i=0;i<this.goodsData.length;i++){
                            if(this.goodsData[i].hasCarted){
                                cartCount++;
                            } 
                        }
                        this.cartCount = cartCount;
                        
                    }
                })
            },
            _setPriceFilter(index){
                let price = this.priceFilterBy[index];
                let startPrice, endPrice;
                index == 'all' ? [startPrice, endPrice] = [0,Infinity] : [startPrice=0, endPrice=Infinity] = [this.priceFilterBy[index].startPrice, price.endPrice];
                this.displayedList = this.goodsData.filter((item) => {
                    return (+item.productPrice < +endPrice && +item.productPrice >= startPrice);
                })
                this.priceChecked = index;
                this._closeFilterPop();
            },
            _showFilterPop(){
                this.filterBy = true;
                this.overlay = true;
            },
            _closeFilterPop(){
                this.filterBy = false;
                this.overlay = false;
            },
            _checkLogStatus(loginInfo){
                this.hasLogin = loginInfo;
            },
            _addToCart(item){
                if(!this.hasLogin){
                    alert('请登录');
                    this.triggerEvent(document.querySelector('a.navbar-link'), 'click');
                    return false;
                }else{
                    item.hasCarted = true;
                    this.cartCount ++;
                }
            },
            _removeFromCart(item){
                item.hasCarted = false;
                this.cartCount --;
            }
        },
        filters: {
            formatMoney(data){
                return '￥' + data + '元';
            }
        },
        components: {
            'nav-demo': NavDemo, // 一个使用vue切换nav的示例
            'mall-header': MallHeader,
            'mall-footer': MallFooter,
            'goods-bread': GoodsBread
        }
    }
</script>
