import Auth from './Auth'
import Blog from './Blog'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Blog: Object.assign(Blog, Blog),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers