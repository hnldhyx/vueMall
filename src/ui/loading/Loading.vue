<template>
    <div class="ui-loading">
        <div class="ui-loading-wrap">
            <span class="ui-loading-img"></span>
            <span class="ui-loading-tip">数据读取中...</span>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .ui-loading{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
    }
    .ui-loading-wrap{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .ui-loading-img{
        display: inline-block;
        height: 105px;
        width: 105px;
        background: url(../../../static/loading-svg/loading-cylon.svg) no-repeat right center;
        vertical-align: middle;
    }

    .ui-loading-tip{
        display: inline-block;
        height: 105px;
        width: 105px;
        line-height: 105px;
        margin-left: 10px;
        vertical-align: middle;
        color: #fff;
        font-size: 16px;
    }
</style>

