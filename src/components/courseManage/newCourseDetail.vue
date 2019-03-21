<template>
    <div class="newCourse-vue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建课程</el-breadcrumb-item>
        </el-breadcrumb>
        <h2-title text="新建课程"></h2-title>
        <div class="title">
            <span class="selected"><i>●</i> &nbsp; 基本信息</span> &nbsp; &gt; &nbsp; <span><i>○</i> &nbsp; 课件上传</span>
        </div>
        <div class="newCourse-content">
            
            <h2 class="h-title">基本信息</h2>
    
            <el-row>
                <el-col :span="3">课程名称：</el-col>
                <el-col :span="10">
                    <el-input v-model="title"  placeholder=""></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">副标题：</el-col>
                <el-col :span="10">
                    <el-input v-model="subtitle"  placeholder=""></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">课程简介：</el-col>
                <el-col :span="10">
                    <el-input v-model="description" type="textarea" placeholder="" :rows="3"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">课程类别：</el-col>
                <el-col :span="3">
                    <!-- <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-cascader
                        :options="subjectList"
                        @active-item-change="loadCatagoryList"
                        v-model="subjectCategory"
                        @change="subjectChange">
                    </el-cascader>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">年龄标签：</el-col>
                <el-col :span="10">
                    <el-tag round>0-6岁</el-tag> <el-tag>6-8岁</el-tag> <el-tag>9-12岁</el-tag> <el-tag>13-16岁</el-tag>
                    <el-tag>16-18岁</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">付费模式：</el-col>
                <el-col :span="10">
                    <el-radio v-model="radio" label="1">免费模式</el-radio>
                    <el-radio v-model="radio" label="2">收费模式</el-radio>
                </el-col>
            </el-row>
            <el-row v-show="radio == 2">
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <div class="charge">
                        <ul>
                            <li>
                                <div>折扣价</div>
                                <el-input v-model="price" placeholder="单位：元"></el-input>
                            </li>
                            <li>
                                <div>原价</div>
                                <el-input placeholder="单位：元"></el-input>
                            </li>
                        </ul>
                        <p>*如课程无折扣优惠可不填写</p>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="10" :offset="3" style="height: 122px; line-height: 122px;">
                    <el-button type="primary" round @click="createCourse">下一步</el-button>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>
<script>
import H2Title from '@/components/courseManage/h2'
export default {
    data() {
        return {
            radio: "2",
            title: '',              //课程名称
            subtitle: '',           //课程副标题
            description: '',         //课程简介
            price: '',                  //价格
            subjectCategory: [],        //默认选中的 课程类别ID 分级数组。
            subjectList: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
        }
    },
    async mounted() {
        try {

            //获取一级课程类别
            let {status, data: {data: dataMsg}} = await this.axios({
                url: '/material/categroy/list/1',
                method: 'get',
                params: {
                    params: {
                        status: 1
                    }
                }
            })

            if (status === 200 && dataMsg) {
                this.subjectList = dataMsg.map((item) => {
                    return {
                        label: item.name,
                        value: item.id,
                        pid: item.pid,
                        children: []
                    }
                })
            }
            
        }
        catch(err) {
            console.log(err)
        }
        
    },
    created() {
        this.options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    },
    methods: {
        async createCourse() {              //点击下一步 ， 创建课程，并进行路由跳转
            console.log("我点击事件了")
            try {
                let {status, data: {data: dataMsg}} = await this.axios({
                url: '/material/course/create',
                    method: 'post',
                    data: {
                        params: {
                            categoryId:1,
                            title:"Blocks of Grass",
                            subtitle:"Completely flat world made of grass blocks.",
                            description:"Plenty of space for building without distractions. ",
                            price:98.00,
                            thumbnail:"http://img.jdcloud.com/n0/1234.png",
                            visible:2,
                            creator:11111,
                            tag1:"10-12岁,15-18岁",
                            tag2:"计算机科学"
                        }
                    }
                })

                if (status === 200 && dataMsg.courseId) {       //课程创建成功

                    this.$router.push({     //点击下一步，跳转到 课件上传页面
                        path: '/admin/courseManage/newCourseUpload'
                    })
                }

            }
            catch(err) {
                console.log(err)
            }

            
        },
        subjectChange(val) {
            console.log("看看什么时候执行：" + val)
        },
        async loadCatagoryList(id) {        //根据上一级分类的id，加载下一级。  参数是选中的value值，是一个数组，对应选中功能的一二级的value值
        
            let {status, data: {data: dataMsg}} = await this.axios({
                url: '/material/categroy/list/' + id[id.length - 1],
                method: 'get',
                params: {
                    params: {
                        status: 1
                    }
                }
            })

            if (status === 200 && dataMsg) {
                this.subjectList.every((item) => {
                    if (item.value == id) {
                        item.children = dataMsg.map((subItem) => {     //结果
                            return {
                                label: subItem.name,
                                value: subItem.id,
                                pid: subItem.pid,
                                children: []
                            }
                        })
                        return false        //跳出循环
                    }
                })
            }
        }
    },
    components: {
        H2Title
    }
}
</script>
<style lang="less" scoped>
.title {
    font-size: 12px;
	font-weight: normal;
    color: #a9a9a9;
    margin-bottom: 30px;
    margin-top: -8px;
    i {
        font-size: 26px;
        position: relative;
        top: 3px;
    }
    .selected {
        color: #5693ff;
    }
}
.h-title {
    font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
    color: #a9a9a9;
    margin-bottom: 20px;
}
.newCourse-vue {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background-color: #F3F3F5;
    z-index: 100;
}
.newCourse-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    border: solid 1px #f1f1f1;
    margin-bottom: 30px;
}
.charge {
    width: 240px;
    height: 120px;
    background-color: #F8FAFC;
    border-radius: 4px;
    border: solid 1px #f1f1f1;
    ul {
        padding-left: 20px;
        padding-right: 20px;
        &:after {
            clear: both;
            display: block;
            content: ''
        }
        li {
            width: 100px;
            height: 80px;
            box-sizing: border-box;
            float: left;
            line-height: 35px;
            div {
                font-size: 12px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #666666;
            }
            & /deep/ .el-input__inner {
                width: 90px;
                height: 30px;
            }
        }
    }
    p {
        font-size: 12px;
        line-height: 34px;
        padding-left: 20px;
        color: #666666;
    }
}

.newCourse-content /deep/ .el-col {
    height: 100px;
    line-height: 100px;
}
</style>
