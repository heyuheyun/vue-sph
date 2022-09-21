import Mock from 'mockjs'
import banner from './banner'
import floors from './floors'

Mock.mock(process.env.VUE_APP_BASE_API+'/mock/banner',{
    code:200,
    data:banner,
})

Mock.mock(process.env.VUE_APP_BASE_API+'/mock/floors',{
    code:200,
    data:floors,
})