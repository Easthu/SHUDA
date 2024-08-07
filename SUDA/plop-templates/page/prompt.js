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
        description: '创建页面',
        prompts: [
            {
                type: 'confirm',
                name: 'isGlobal',
                message: '是否创建文件夹',
                default: false
            },
            {
                type: 'list',
                name: 'path',
                message: '请选择页面创建目录',
                choices: getFolder('src/views'),
                when: answers => {
                    return !answers.isGlobal
                }
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
            {
                type: 'input',
                name: 'cname',
                message: '请输入页面中文名称',
                default: '默认页面'
            }
        ],
        actions: data => {
            console.log('data :>> ', data);
            let dataPath = ''
            if (data.isGlobal) {
                dataPath = `src/views/${data.name}/index.vue`
            } else {
                dataPath = `${data.path}/${data.name}.vue`
            }
            // let relativePath = path.relative('src/views', data.path)

            const actions = [
                {
                    type: 'add',
                    path: dataPath,
                    templateFile: 'plop-templates/page/index.hbs',
                    data: {
                        // componentName: `${relativePath} ${data.name}`
                        componentName: `${data.name}`

                    }
                }
            ]
            return actions
        }
    }
}
