import Auth from './Auth'
import Blog from './Blog'
import Settings from './Settings'
import Pomelo from './Pomelo'
import Brando from './Brando'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Blog: Object.assign(Blog, Blog),
    Settings: Object.assign(Settings, Settings),
    Pomelo: Object.assign(Pomelo, Pomelo),
    Brando: Object.assign(Brando, Brando),
}

export default Controllers