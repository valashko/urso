import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
window.PIXI.particles = require('pixi-particles');

import { DropShadowFilter } from '@pixi/filter-drop-shadow';
PIXI.filters['DropShadowFilter'] = DropShadowFilter;


window.PIXI.spine = require("pixi-spine");
require("pixi-projection");
require("pixi-text-input");

import { gsap } from 'gsap';
window.gsap = gsap;
require('./setTimeout');

import Howler from 'howler';
window.Howler = Howler;

Urso.Core.Extra = {
    BrowserEvents: require('./browserEvents.js')
};
