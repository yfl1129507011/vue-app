<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="clearInx">
                <h2 class="all">全部商品分类</h2>
                <div class="sort">
                    <div class="all-sort-list2" @click="goSearch">
                        <div :class="{ cur: curInx == inx }" class="item" v-for="(c1, inx) in categoryList"
                            :key="c1.categoryId">
                            <h3 @mouseenter="changeInx(inx)">
                                <a :data-catId1="c1.categoryId" :data-categoryName="c1.categoryName">{{ c1.categoryName
                                }}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{ display: curInx == inx ? 'block' : 'none' }">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-catId2="c2.categoryId" :data-categoryName="c2.categoryName">{{
                                                    c2.categoryName
                                            }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-catId3="c3.categoryId" :data-categoryName="c3.categoryName">{{
                                                        c3.categoryName
                                                }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入节流函数
import throttle from 'lodash/throttle'

export default {
    name: "TypeNav",
    data() {
        return {
            curInx: -1
        }
    },
    mounted() {
        this.$store.dispatch('categoryList')
    },
    computed: {
        ...mapState({
            // 参数state,传入的是大仓库中的数据
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // 使用函数节流，减少触发函数请求，throttle不能使用箭头函数
        changeInx: throttle(function (inx) {
            this.curInx = inx
        }, 100),
        clearInx() {
            this.curInx = -1
        },
        goSearch(event) {
            let element = event.target
            let { categoryname, catid1, catid2, catid3 } = element.dataset
            // console.log(element.dataset)
            if (categoryname) {
                let location = {
                    name: 'search'
                }
                let query = { categoryName: categoryname }

                if (catid1) { // 一级分类
                    query.catId1 = catid1
                } else if (catid2) { // 二级分类
                    query.catId2 = catid2
                } else {
                    query.catId3 = catid3
                }

                location.query = query
                console.log(location)
                this.$router.push(location)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /* &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
                }

                /* .item:hover {
                    background: skyblue;
                } */

                .cur {
                    background: skyblue;
                }
            }
        }
    }
}
</style>