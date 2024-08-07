/*
 * @Author: Est
 * @Date: 2023-03-16 09:54:45
 * @LastEditors: Est
 * @LastEditTime: 2023-03-16 10:42:29
 * @FilePath: \LNFOODZOONVUE3\plop-templates\hook\prompt.js
 * @Description: 
 */
import fs from 'fs'
import path from 'path'
function getFolder(path) {
    let components = []
    const files = fs.readdirSync(path)
    files.forEach(function (item) {
        let stat = fs.lstatSync(path + '/' + item)
        if (stat.isDirectory() === true && item != 'components') {
            components.push(path + '/' + item)
            components.push.apply(components, getFolder(path + '/' + item))
        }
    })
    return components
}

export default function (plop) {
    return {
        description: '创建hook',
        prompts: [
            {
                type: 'list',
                name: 'path',
                message: '请选择hook创建目录',
                choices: getFolder('src/views')
            },
            {
                type: 'input',
                name: 'name',
                message: '请输入文件名',
                validate: v => {
                    if (!v || v.trim === '') {
                        return '文件名不能为空'
                    } else if (v == 'list' || v == 'detail') {
                        return 'list 和 detail 为保留关键字，无法直接创建，请通过创建标准模块进行生成'
                    } else {
                        return true
                    }
                }
            },
        ],
        actions: data => {
            let relativePath = path.relative('src/views/hooks', data.path)
            const actions = [
                {
                    type: 'add',
                    path: `${data.path}/hooks/{{name}}.js`,
                    templateFile: 'plop-templates/hook/hook.hbs',
                }
            ]
            return actions
        }
    }
}
