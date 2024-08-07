import plopPage from './plop-templates/page/prompt.js'
import plopComponent from './plop-templates/component/prompt.js'
import plopStore from './plop-templates/store/prompt.js'
import plopHook from './plop-templates/hook/prompt.js'

export default function (plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  plop.setGenerator('page', plopPage(plop))
  plop.setGenerator('component', plopComponent(plop))
  plop.setGenerator('store', plopStore(plop))
  plop.setGenerator('hook', plopHook(plop))
  // plop.setGenerator('mock', require('./plop-templates/mock/prompt'))

}
