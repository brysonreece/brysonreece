import Auth from './Auth';
import Blog from './Blog';
import Brando from './Brando';
import Pomelo from './Pomelo';
import Settings from './Settings';

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Blog: Object.assign(Blog, Blog),
    Settings: Object.assign(Settings, Settings),
    Pomelo: Object.assign(Pomelo, Pomelo),
    Brando: Object.assign(Brando, Brando),
};

export default Controllers;
