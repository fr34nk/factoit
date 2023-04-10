const LOG_DEFAULTS = {
    type: 'log' || 'file',
    msgfmt: '[%date] - [%lvl] - '
}

const LOG_LVLS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    CRITICAL: 4,
}

// If both search and replaceBy conditions are met, replace the string, otherse return "or" value
String.prototype.replaceOr = function (search, replaceBy, or) {
    if (String.prototype.match.call(this, search) && replaceBy != undefined) {
        return String.prototype.replace.call(this, search, replaceBy)
    }
    return or;
}

// log interfaces
function consolelog () {
    return {
        log (msg) {
            console.log(msg);
        }
    }
}

function filelog (filepath) {
    return {
        log (msg) {
            console.log(`[outfile=${filepath}] ${msg}`);
        }
    }
}


class Log {
    static ENABLED=true;
    static LVL=LOG_LVLS.INFO;

    logger = console.log;
    
    msgFormat = null;
    infoFormat = null;
    debugFormat = null;
    warnFormat = null;
    errorFormat = null;
    criticalFormat = null;

    constructor (config={ 
            type: LOG_DEFAULTS.type,
            
            // msgFormat: LOG_DEFAULTS.msgfmt,
            infoFormat: null,
            debugFormat: null,
            warnFormat: null,
            errorFormat: null,
            criticalFormat: null,
        }, args={ 
            filePath: null,
            logLvl: LOG_LVLS.DEBUG
    }) {
        if (config.type === 'file') {
            this.logger = filelog(args.filePath);
        } else {
            this.logger = consolelog();
        }

        // this.msgFormat = config.msgFormat;
        this.defaultFormat = config.defaultFormat;
        this.infoFormat = config.infoFormat;
        this.debugFormat = config.debugFormat;
        this.warnFormat = config.warnFormat;
        this.errorFormat = config.errorFormat;
        this.criticalFormat = config.criticalFormat;
    }

    _logMessage (lvl, msg, msgargs) {
        // Message Format
        let msgFmt = null;
        msgFmt = this.infoFormat && lvl === LOG_LVLS.INFO;
        msgFmt = this.debugFormat  && lvl === LOG_LVLS.DEBUG;
        msgFmt = this.warnFormat && lvl === LOG_LVLS.WARN;
        msgFmt = this.errorFormat && lvl === LOG_LVLS.ERROR;
        msgFmt = this.criticalFormat &&  lvl === LOG_LVLS.CRITICAL;
        msgFmt = this.defaultFormat;

        // if %msg in cosider msfFmt is not a prefix but will replace %msg in place
        const resultMsg = this._msgFormatter(msgFmt, msg, msgargs);
        return resultMsg;
    }

    _msgFormatter (msgFmt, msg, args={}) {
        let finalMsg="";

        // apply prefix
        if (msgFmt != null) {
            finalMsg = msgFmt + msg;
        } else {
            finalMsg = msg;
        }

        // process %msg first because can have interpolations inside itself
        finalMsg = finalMsg.replaceOr(/%msg/, args['msg'], finalMsg);

        const msgFields = finalMsg.match(/\%\w+/g).map(x => x.replace('%', ''));

        msgFields && msgFields.map((replField) => {
            if (replField == 'date') {
                const d = new Date().toISOString();
                finalMsg=finalMsg.replace(`%${replField}`, d);
            } else {
                finalMsg = finalMsg.replaceOr(`%${replField}`, args[replField], finalMsg);
            }
        })

        console.log(finalMsg)
        return finalMsg;
    }

    info (message, args={}) {
        if (Log.ENABLED && Log.LVL >= LOG_LVLS.INFO) {
            // aggregate to args
            let msgargs = { lvl: 'INFO', ...args }
            this._logMessage(LOG_LVLS.INFO, message, msgargs);
        }
    }
    debug (message, args={}) {
        if (Log.ENABLED && Log.LVL >= LOG_LVLS.DEBUG) {
            // aggregate to args
            let msgargs = { lvl: 'DEBUG', ...args }
            this._logMessage(LOG_LVLS.DEBUG, message, msgargs );
        }
    }
    warn (message, args={}) {
        if (Log.ENABLED && Log.LVL >= LOG_LVLS.WARN) {
            // aggregate to args
            let msgargs = { lvl: 'WARN', ...args }
            this._logMessage(LOG_LVLS.WARN, message, msgargs);
        }
    }
    error (message, args={}) {
        if (Log.ENABLED && Log.LVL >= LOG_LVLS.ERROR) {
            // aggregate to args
            let msgargs = { lvl: 'ERROR', ...args }
            this._logMessage(LOG_LVLS.ERROR, message, msgargs);
        }
    }
    critical (message, args={}) {
        if (Log.ENABLED && Log.LVL >= LOG_LVLS.CRITICAL) {
            // aggregate to args
            let msgargs = { lvl: 'CRITICAL', ...args }
            this._logMessage(LOG_LVLS.CRITICAL, message, msgargs);
        }
    }
}

// Log.LVL=LOG_LVLS.WARN;
// export default new Log({ type: 'log', defaultFormat: '[%lvl][%date] - '})
export default new Log({ type: 'log', defaultFormat: '[%date][%lvl] - ' })

