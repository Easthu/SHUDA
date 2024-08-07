/*
 * @Author: Est
 * @Date: 2023-03-16 09:50:12
 * @LastEditors: Est
 * @LastEditTime: 2023-03-16 10:26:45
 * @FilePath: \LNFOODZOONVUE3\plop-templates\store\prompt.js
 * @Description: 
 */
export default function (plop) {
    return {

        description: '创建全局状态',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '请输入模块名称',
                validate: v => {
                    if (!v || v.trim === '') {
                        return '模块名称不能为空'
                    } else {
                        return true
                    }
                }
            }
        ],
        actions: () => {
            const actions = [
                {
                    type: 'add',
                    path: 'src/store/modules/{{camelCase name}}.js',
                    templateFile: 'plop-templates/store/index.hbs'
                }
            ]
            return actions
        }
    }
}
