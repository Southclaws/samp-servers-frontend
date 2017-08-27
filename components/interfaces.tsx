
export interface ServerCore {
    ip: string
    hn: string
    pc: number
    pm: number
    gm: string
    la: string
    pa: boolean
}

export interface ServerFull {
    core: ServerCore
    ru: ServerRules
    pl: Array<string>
    description: string
    banner: string
}

export interface ServerRules {
    [key: string]: string
}

export function decodeServerCore(obj: any): ServerCore {
    let ret: ServerCore = {
        ip: obj.ip,
        hn: obj.hn,
        pc: obj.pc,
        pm: obj.pm,
        gm: obj.gm,
        la: obj.la,
        pa: obj.pa,
    }

    return ret
}

export function blankServer(): ServerFull {
    let c: ServerCore = {
        ip: "",
        hn: "",
        pc: 0,
        pm: 0,
        gm: "",
        la: "",
        pa: false,
    }
    let r: ServerFull = {
        core: c,
        ru: {},
        pl: [],
        description: "",
        banner: ""
    }

    return r
}