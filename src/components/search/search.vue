<template>
    <div class="searchBox">
        <el-row :gutter="10" type="flex" justify="end">
            <el-col :span="5" v-if="config.date">
                <el-date-picker
                    v-model="date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="4" v-if="config.select1">
                <el-select v-model="select1" :placeholder="config.select1.placeholder">
                    <el-option
                    v-for="item in config.select1.data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" v-if="config.select2">
                <el-select v-model="select2" :placeholder="config.select2.placeholder">
                    <el-option
                    v-for="item in config.select2.data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" v-if="config.select3">
                <el-select v-model="select3" :placeholder="config.select3.placeholder">
                    <el-option
                    v-for="item in config.select3.data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5" v-if="config.cascader1">
                <el-cascader
                    :options="config.cascader1.data"
                    v-model="categoryId1"
                    :props = 'subjectProps'
                    :placeholder="config.cascader1.placeholder"
                    :show-all-levels="false">
                </el-cascader>
            </el-col>
            <el-col :span="5" v-if="config.text">
                <el-input v-model="searchText" :placeholder="config.text.placeholder"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" circle @click="startSearch"></el-button>
            </el-col>
        </el-row>

    </div>
</template>
<script>
//这个是 搜索 组件

export default {
    props: {
        config: {             //搜索组件配置，包含placeholder、下拉框数据、搜索表单元素显示个数等
            type: Object
        }
        /*
            config模拟数据
            config: {
                date: true,         //是否显示日期搜索组件
                select1: {          //第一个下拉框
                    placeholder: '',
                    data: [{
                        value: 111,
                        label: '这个是下拉框元素内容'
                    }]
                },
                select2: {          //第二个下拉框
                    placeholder: '',
                    data: [{
                        value: 111,
                        label: '这个是下拉框元素内容'
                    }]
                },
                select3: {          //第三个下拉框
                    placeholder: '',
                    data: [{
                        value: 111,
                        label: '这个是下拉框元素内容'
                    }]
                },
                cascader1: {
                    placeholder: '',
                    data: [{
                        "id": 1,
                        "name": "编程与开发",
                        "childs": [{
                            "id": 2,
                            "name": "编程语言",
                            "childs": [{
                                "id": 3,
                                "name": "JAVA"
                            }, {
                                "id": 4,
                                "name": "PHP"
                            }]
                        }]
                    }, {
                        "id": 5,
                        "name": "前端开发",
                        "childs": [{
                            "id": 6,
                            "name": "前端框架"
                        }]
                    }, {
                        "id": 7,
                        "name": "后端开发",
                        "childs": [{
                            "id": 8,
                            "name": "Java Web"
                        }]
                    }]
                },
                text: {       //是否显示input搜索输入框
                    placeholder: ''
                }

            }
        */
    },
    data() {
        return {
            date: '',
            select1: '',
            select2: '',
            select3: '',
            searchText: '',
            categoryId1: [],    //分类id，数组     
            subjectProps: {             //级联选择器字段定义
                value: 'id',
                children: 'childs',
                label: 'name'
            }
        }
    },
    methods: {
        startSearch() {         //点击搜索按钮，开始搜索。返回多个搜索信息组成的对象
            this.$emit('getSearchText', {
                date: this.date,
                select1: this.select1,
                select2: this.select2,
                select3: this.select3,
                categoryId1: this.categoryId1,
                searchText: this.searchText
            })
        }
    },
    components: {

    }
}
</script>
<style lang="less">
.searchBox {
    width: 900px;
    & /deep/ .el-date-editor.el-input {
        width: 100%;
    }
}
</style>

