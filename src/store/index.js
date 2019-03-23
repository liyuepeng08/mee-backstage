import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        title: '',              //课程名称
        subtitle: '',           //课程副标题
        description: '',         //课程简介
        price: 0,               //课程价格
        tag1: '',            //课程年龄标签
        categoryId: [],          //课程类别ID
        thumbnail: '',               //课程封面图片路径地址
        courseId: '',                //当前要生成的、或者要修改的课程的id。
        attachList: [],             //课程的附件列表
        videoAttachList: [],            //视频附件列表
        wordAttachList: []              //文档附件列表
    },
    mutations: {
        setTitle(state, value) {
            state.title = value
        },
        setSubtitle(state, value) {
            state.subtitle = value
        },
        setDescription(state, value) {
            state.description = value
        },
        setPrice(state, value) {
            state.price = value
        },
        setTag1(state, value) {
            state.tag1 = value
        },
        setCategoryId(state, value) {
            state.categoryId = value
        },
        setThumbnail(state, value) {
            state.thumbnail = value
        },
        setCourseId(state, value) {
            state.courseId = value
        },
        // pushAttachList(state, obj) {
        //     state.attachList.push(obj)
        // },
        // deleteAttachList(state, uri) {      //删除附件列表中的某一项附件，通过uri来识别
        //     state.attachList.forEach((item, index) => {
        //         if (item.uri === uri) {
        //             state.attachList.splice(index, 1)
        //         }
        //     })
        // },
        pushVideoAttach(state, obj) {
            state.videoAttachList.push(obj)
        },
        pushWordAttach(state, obj) {
            state.wordAttachList.push(obj)
        },
        deleteVideoAttach(state, uri) {      //删除附件列表中的某一项附件，通过uri来识别
            state.videoAttachList.forEach((item, index) => {
                if (item.uri === uri) {
                    state.videoAttachList.splice(index, 1)
                }
            })
        },
        deleteWordAttach(state, uri) {      //删除附件列表中的某一项附件，通过uri来识别
            state.wordAttachList.forEach((item, index) => {
                if (item.uri === uri) {
                    state.wordAttachList.splice(index, 1)
                }
            })
        },
        emptyCourseVuex(state) {        //新建或者更新课程时，清空上一个课程的vuex的信息
            state.title = ''              //课程名称
            state.subtitle = ''           //课程副标题
            state.description = ''         //课程简介
            state.price = 0               //课程价格
            state.tag1 = ''            //课程年龄标签
            state.categoryId = []         //课程类别ID
            state.thumbnail = ''               //课程封面图片路径地址
            state.courseId = ''                //当前要生成的、或者要修改的课程的id。
            state.videoAttachList = []            //视频附件列表
            state.wordAttachList = []              //文档附件列表
        },
        setCourseDetail(state, dataMsg) {
            state.title = dataMsg.title              //课程名称
            state.subtitle = dataMsg.subtitle           //课程副标题
            state.description = dataMsg.description         //课程简介
            state.price = dataMsg.price               //课程价格
            state.tag1 = dataMsg.tag1            //课程年龄标签
            state.categoryId = [dataMsg.categoryId]         //课程类别ID
            state.thumbnail = dataMsg.thumbnail               //课程封面图片路径地址
        }
    }
})

export default store