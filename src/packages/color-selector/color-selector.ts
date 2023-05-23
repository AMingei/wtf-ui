class LockedColorProperty {
	private _value: number
	private _locked: boolean
	constructor(value: any, locked?: boolean) {
		this._value = value
		this._locked = locked === undefined ? false : locked
	}
	get value() {
		return this._value
	}
	set value(val) {
		if(!this.locked) {
			this._value = val
		} else {
			console.warn('[LockedColorProperty-value-setter]: the property is locked!')
		}
	}
	get locked() {
		return this._locked
	}
	lock() {
		this._locked = true
	}
	unlock() {
		this._locked = false
	}
}

abstract class Color {
	private _hue = new LockedColorProperty(0)
	private _a = 100
	get hue() {
		return this._hue
	}
	set hue(val: LockedColorProperty) {
		this._hue = val
	}
	get a() {
		return this._a
	}
	set a(val) {
		this._a = val < 0 ? 0 : val > 100 ? 100 : val
	}
	setSafeA(val: number) {
		this.a = val
		this.hue.lock()
	}
	abstract update(color: Color): void
	abstract equals(color: Color): boolean
}

interface RGB {
	r: number
	g: number
	b: number
	toHSL(): ColorHSL
	toHSV(): ColorHSV
}

interface HSL {
	h: number
	s: number
	l: number
	toRGB(): ColorRGB
	toHSV(): ColorHSV
}

interface HSV {
	h: number
	s: number
	v: number
	toRGB(): ColorRGB
}

export class ColorRGB extends Color implements RGB {
	private _r: number = 0
	private _g: number = 0
	private _b: number = 0
	constructor(arg1: string)
	constructor(arg1: number, arg2: number, arg3: number, arg4: number, arg5?: LockedColorProperty)
	constructor(arg1: string | number, arg2: number = 0, arg3: number = 0, arg4: number = 0, arg5?: LockedColorProperty) {
		super()
		if(typeof arg1 === 'string') {
			this.r = parseInt('0x' + arg1.slice(0, 2))
			this.g = parseInt('0x' + arg1.slice(2, 4))
			this.b = parseInt('0x' + arg1.slice(4, 6))

			if(arg1.length === 8) {
				this.a = parseInt((100 * parseInt('0x' + arg1.slice(6, 8)) / 255).toString())
			}

			const r = this.r / 255,
				g = this.g / 255,
				b = this.b / 255
			const min = Math.min(r, g, b),
				max = Math.max(r, g, b)
			const dif = max - min
			this.hue.value = max === min ?
				0 : max === r ?
					60 * (g - b) / dif + (g < b ? 360 : 0) : max === g ?
						60 * (b - r) / dif + 120 : 60 * (r - g) / dif + 240
		} else if(typeof arg1 === 'number') {
			this.r = Math.round(arg1)
			this.g = Math.round(arg2)
			this.b = Math.round(arg3)
			this.a = Math.round(arg4)
			if(arg5 && typeof arg5 === 'object') {
				this.hue = arg5
			} 
		}
	}
	get r() {
		return this._r
	}
	set r(val) {
		this._r = val < 0 ? 0 : val > 255 ? 255 : val
	}
	get g() {
		return this._g
	}
	set g(val) {
		this._g = val < 0 ? 0 : val > 255 ? 255 : val
	}
	get b() {
		return this._b
	}
	set b(val) {
		this._b = val < 0 ? 0 : val > 255 ? 255 : val
	}
	update(color: ColorRGB) {
		this.r = color.r
		this.g = color.g
		this.b = color.b
		this.a = color.a
		this.hue = color.hue
	}
	toHSL() {
		const r = this.r / 255,
			g = this.g / 255,
			b = this.b / 255
		const min = Math.min(r, g, b),
			max = Math.max(r, g, b)
		const dif = max - min,
			sum = max + min
		let h = 0
		if(this.hue.locked) {
			h = this.hue.value
		} else {
			h = max === min ?
				0 : max === r ?
					60 * (g - b) / dif + (g < b ? 360 : 0) : max === g ?
						60 * (b - r) / dif + 120 : 60 * (r - g) / dif + 240
		}
		const s = sum === 0 ?
			0 : dif / (
				sum > 1 ? 2 - sum : sum
			)
		const l = .5 * sum
		return new ColorHSL(h, s * 100, l * 100, this.a, this.hue)
	}
	toHSV() {
		const r = this.r / 255,
			g = this.g / 255,
			b = this.b / 255
		const min = Math.min(r, g, b),
			max = Math.max(r, g, b)
		const dif = max - min
		let h = 0
		if(this.hue.locked) {
			h = this.hue.value
		} else {
			h = max === min ?
				0 : max === r ?
					60 * (g - b) / dif + (g < b ? 360 : 0) : max === g ?
						60 * (b - r) / dif + 120 : 60 * (r - g) / dif + 240
		}
		const s = max === 0 ?
			0 : dif / max
		const v = max
		return new ColorHSV(h, s * 100, v * 100, this.a, this.hue)
	}
	toString() {
		return this.r.toString(16).toUpperCase().padStart(2, '0')
		+ this.g.toString(16).toUpperCase().padStart(2, '0')
		+ this.b.toString(16).toUpperCase().padStart(2, '0')
		+ parseInt((this.a * 255 / 100).toString()).toString(16).toUpperCase().padStart(2, '0')
	}
	equals(color: ColorRGB) {
		return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a
	}
}

export class ColorHSL extends Color implements HSL {
	private _h: number = 0
	private _s: number = 0
	private _l: number = 0
	constructor(h: number, s: number, l: number, a: number, hue: LockedColorProperty) {
		super()
		this.h = Math.round(h)
		this.s = Math.round(s)
		this.l = Math.round(l)
		this.a = Math.round(a)
		this.hue = hue
	}
	update(color: ColorHSL) {
		this.h = color.h
		this.s = color.s
		this.l = color.l
		this.a = color.a
		this.hue = color.hue
	}
	get h() {
		return this._h
	}
	set h(val) {
		this.hue.value = val
		this._h = val < 0 ? 0 : val > 359 ? 359 : val
	}
	get s() {
		return this._s
	}
	set s(val) {
		this._s = val < 0 ? 0 : val > 100 ? 100 : val
	}
	get l() {
		return this._l
	}
	set l(val) {
		this._l = val < 0 ? 0 : val > 100 ? 100 : val
	}
	toRGB() {
		const h = this.h / 359,
			s = this.s / 100,
			l = this.l / 100
		if(s === 0) {
			return new ColorRGB(l * 255, l * 255, l * 255, this.a, this.hue)
		} else {
			const q = l + s * (
				l < .5 ? l : 1 - l
			)
			const p = 2 * l - q
			let c = [h + 1 / 3, h, h - 1 / 3]
			c = c.reduce((acc: number, cur: number) => {
				(acc as unknown as number[]).push(cur - Math.sign(parseInt((2 * cur - 1).toString())))
				return acc
			}, [] as unknown as number) as unknown as number[]
			c = c.reduce((acc: number, cur: number) => {
				(acc as unknown as number[]).push(
					cur < 1 / 6 ? p + ((q - p) * 6 * cur)
						: cur < 1 / 2 ? q
							: cur < 2 / 3 ? p + ((q - p) * 6 * (2 / 3 - cur))
								: p
				)
				return acc
			}, [] as unknown as number) as unknown as number[]
			return new ColorRGB(c[0] * 255, c[1] * 255, c[2] * 255, this.a, this.hue)
		}
	}
	toHSV() {
		const h = this.h,
			l = this.l / 100,
			s = this.s / 100
		const h_i = h
		const v = l + s * Math.min(l, 1 - l)
		const s_i = v === 0 ? 0 : 2 * (1 - l / v)
		return new ColorHSV(h, s_i * 100, v * 100, this.a, this.hue)
	}
	equals(color: ColorHSL) {
		return this.h === color.h && this.s === color.s && this.l === color.l && this.a === color.a
	}
}

export class ColorHSV extends Color implements HSV {
	private _h: number = 0
	private _s: number = 0
	private _v: number = 0
	constructor(h: number, s: number, v: number, a: number, hue?: LockedColorProperty) {
		super()
		this.h = Math.round(h)
		this.s = Math.round(s)
		this.v = Math.round(v)
		this.a = Math.round(a)
		if(hue && typeof hue === 'object') {
			this.hue = hue
		}
	}
	get h() {
		return this._h
	}
	set h(val) {
		this.hue.value = val
		this._h = val < 0 ? 0 : val > 359 ? 359 : val
	}
	get s() {
		return this._s
	}
	set s(val) {
		this._s = val < 0 ? 0 : val > 100 ? 100 : val
	}
	get v() {
		return this._v
	}
	set v(val) {
		this._v = val < 0 ? 0 : val > 100 ? 100 : val
	}
	setSafeH(val: number) {
		this.h = val
		this.hue.lock()
	}
	setSafeS(val: number) {
		this.s = val
		this.hue.lock()
	}
	setSafeV(val: number) {
		this.v = val
		this.hue.lock()
	}	
	update(color: ColorHSV) {
		this.h = color.h
		this.s = color.s
		this.v = color.v
		this.a = color.a
		this.hue = color.hue
	}
	toRGB() {
		const h = this.h,
			s = this.s / 100,
			v = this.v / 100
		const h_i = Math.floor(h / 60) % 6
		const f = h / 60 - h_i
		const p = v * (1 - s),
			q = v * (1 - f * s),
			t = v * (1 - (1 - f) * s)
		let c
		switch(h_i) {
			case 0:
				c = [v, t, p]
				break
			case 1:
				c = [q, v, p]
				break
			case 2:
				c = [p, v, t]
				break
			case 3:
				c = [p, q, v]
				break
			case 4:
				c = [t, p, v]
				break
			case 5:
				c = [v, p, q]
				break
		}
		if(Array.isArray(c)) {
			return new ColorRGB(c[0] * 255, c[1] * 255, c[2] * 255, this.a, this.hue)
		} else {
			console.warn(`current color format is invalid.\nColor: hsv(${this.h}, ${this.s}, ${this.v})`)
			return new ColorRGB(0, 0, 0, this.a, this.hue)
		}
	}
	equals(color: ColorHSV) {
		return this.h === color.h && this.s === color.s && this.v === color.v && this.a === color.a
	}
	toString() {
		return `hue: ${this.hue.value}, h: ${this.h}, s: ${this.s}, v: ${this.v}, a: ${this.a}`
	}
}