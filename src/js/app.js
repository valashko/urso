class App {
    constructor() {
        this.version = 'APP_VERSION';

        this.setup = this.setup.bind(this);
    }

    setup() {
        this.sayHello();

        //helper must be first
        Urso.helper = new Urso.Core.Lib.Helper(); //helper functions

        //setup Instances
        let instances = new Urso.Core.Modules.Instances.Controller();
        Urso.getInstance = instances.getInstance;
        Urso.getByPath = instances.getByPath;
        Urso.getInstancesModes = instances.getModes;
        Urso.addInstancesMode = instances.addMode;
        Urso.removeInstancesMode = instances.removeMode;

        //build from extendingChain and merge all into Urso.Game
        Urso.Game = {};
        for (let extention of Urso.config.extendingChain)
            Urso.helper.mergeObjectsRecursive(Urso.Game, Urso.helper.recursiveGet(extention, window, {}), true);

        //(!)important we must use only Urso.Game from our code

        //observer pattern
        Urso.observer = Urso.getInstance('Modules.Observer.Controller');

        //Extra
        Urso.browserEvents = Urso.getInstance('Extra.BrowserEvents');

        //libs
        Urso.cache = Urso.getInstance('Lib.Cache'); //all assets cache
        Urso.device = Urso.getByPath('Lib.Device'); //all device info
        Urso.loader = Urso.getInstance('Lib.Loader'); //assets loader class
        Urso.localData = Urso.getInstance('Lib.LocalData'); //local data storage
        Urso.logger = Urso.getInstance('Lib.Logger'); //logger
        Urso.math = Urso.getInstance('Lib.Math'); //math functions
        Urso.time = Urso.getInstance('Lib.Time'); //time functions
        Urso.tween = Urso.getInstance('Lib.Tween'); //tween lib

        //Modules
        Urso.assets = Urso.getInstance('Modules.Assets.Controller');
        Urso.transport = Urso.getInstance('Modules.Transport.Controller');
        Urso.logic = Urso.getInstance('Modules.Logic.Controller');
        Urso.objects = Urso.getInstance('Modules.Objects.Controller');
        Urso.scenes = Urso.getInstance('Modules.Scenes.Controller');
        Urso.soundManager = Urso.getInstance('Modules.SoundManager.Controller');
        Urso.statesManager = Urso.getInstance('Modules.StatesManager.Controller');
        Urso.template = Urso.getInstance('Modules.Template.Controller');

        //set title
        document.title = Urso.config.title;

        //device type mode
        Urso.addInstancesMode(!Urso.helper.mobileAndTabletCheck() ? 'desktop' : 'mobile');

        //App.run
        Urso.device.whenReady(() => {
            Urso.assets.updateQuality();
            Urso.getInstance('App').run();
        });
    }

    sayHello() {
        console.log(`%c ${String.fromCodePoint(0x1F43B)} Urso ${this.version} `, 'background: #222; color: #bada55');
    }

    run() {
        Urso.scenes.display(Urso.config.defaultScene);
    }
}

module.exports = App;
