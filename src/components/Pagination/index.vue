<template>
    <div class="pagination">
        <!-- 上 -->
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
            上一页
        </button>
        <button @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }" v-if="startEndNum.start > 1">
            1
        </button>
        <button v-if="startEndNum.start > 2">···</button>
        <!-- 中间部分 -->
        <button @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }"
            v-for="(page, inx) in startEndNum.end" :key="inx" v-if="page >= startEndNum.start">
            {{ page }}
        </button>
        <!-- 下 -->
        <button v-if="startEndNum.end < totalPage - 1">···</button>
        <button @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo == totalPage }"
            v-if="startEndNum.end < totalPage">{{ totalPage }}</button>
        <button @click="$emit('getPageNo', pageNo + 1)" :disabled="pageNo == totalPage">
            下一页
        </button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        startEndNum() {
            const { totalPage, continues, pageNo } = this
            let start = 0, end = 0
            if (continues > totalPage) {  // 连续页码数超过总页码数
                start = 1
                end = totalPage
            } else {
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                if (start < 1) {
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }

            return { start, end }
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

.active {
    background: skyblue;
}
</style>