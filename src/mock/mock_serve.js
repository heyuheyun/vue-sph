import Mock from 'mockjs'
import banner from './banner'
import floors from './floors'

Mock.mock('/mock/banner',{
    code:200,
    data:banner,
})

Mock.mock('/mock/floors',{
    code:200,
    data:floors,
})