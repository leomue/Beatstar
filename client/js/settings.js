'use strict';
import fs from 'fs';
import os from 'os'
import {pack,packdir} from './main';
import {ScrollingText} from './scrollingText';
class Settings {
constructor() {
this.beatcoins=0,
this.pack="default",
this.unlocks={
"default":0,
}
}
}
export {Settings}