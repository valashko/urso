ComponentsBaseController = require('./../base/controller.js');

class ComponentsFullscreenController extends ComponentsBaseController {

  constructor(params) {
    super(params);

    this._fullscreenActivator = null;
    this._resolutionsConfig = null;

    this.createActivator();
  }

  createActivator() {
    if (this._isCriOS)
      return;

    this._resolutionsConfig = Urso.getInstance('Modules.Scenes.ResolutionsConfig').contents || [];

    if (Urso.device.desktop)
      this._fullscreenActivator = this.getInstance('Desktop');
    else if (Urso.device.iOS)
      this._fullscreenActivator = this.getInstance('Ios');
    else if (Urso.device.android)
      this._fullscreenActivator = this.getInstance('Android');

    if (this._fullscreenActivator)
      this._fullscreenActivator.init();
  }

  get _isCriOS() {
    return navigator.userAgent.indexOf('CriOS') !== -1;
  }

  get _orientationsConfig() {
    return Urso.getInstance('Modules.Scenes.ResolutionsConfig')._orientations || [];
  }

  get _showOnLandscape() {
    return this._resolutionsConfig.find(resolution => resolution.orientation === 'landscape');
  }

  get _showOnPortrait() {
    return this._resolutionsConfig.find(resolution => resolution.orientation === 'portrait');
  }

  get _isPortrait() {
    return innerWidth > innerHeight ? 'portrait' : 'landscape';
  }

  get isFullscreen() {
    return this._fullscreenActivator.isFullscreen;
  }

  _resizeHandler() {
    Urso.localData.set('fullscreen.isFullscreen', this.isFullscreen);
  }

  _subscribeOnce() {
    this.addListener(Urso.events.EXTRA_BROWSEREVENTS_WINDOW_RESIZE, this._resizeHandler.bind(this));
  }
}

module.exports = ComponentsFullscreenController;
