export class WtfDate {
	private _now: Date
	constructor()
	constructor(arg1?: Date)
	constructor(arg1?: WtfDate)
	constructor(arg1?: number, arg2?: number, arg3?: number)
	constructor(arg1?: Date | WtfDate | number, arg2: number = 1, arg3: number = 1) {
		if(arg1 instanceof Date) {
			this._now = arg1
		} else if(arg1 instanceof WtfDate) {
			this._now = new Date(arg1.year, arg1.month - 1, arg1.date)
		} else if(typeof arg1 === 'number') {
			this._now = new Date(arg1, arg2 - 1, arg3)
		} else {
			this._now = new Date()
		}
	}
	get year() {
		return this._now.getFullYear()
	}
	set year(val) {
		this._now.setFullYear(val)
	}
	get month() {
		return this._now.getMonth() + 1
	}
	set month(val) {
		this._now.setMonth(val - 1)
	}
	get date() {
		return this._now.getDate()
	}
	set date(val) {
		this._now.setDate(val)
	}
	get day() {
		return this._now.getDay()
	}
	get now() {
		return this._now
	}
	equals(date: Date): boolean
	equals(date: WtfDate): boolean
	equals(date: Date | WtfDate) {
		if(date instanceof Date) {
			return date.getFullYear() === this.year && date.getMonth() + 1 === this.month && date.getDate() === this.date
		} else if(date instanceof WtfDate) {
			return date.year === this.year && date.month === this.month && date.date === this.date
		}
	}
	toString() {
		return `${this.year}-${String(this.month).padStart(2, '0')}-${String(this.date).padStart(2, '0')}`
	}
	toYMString() {
		return `${this.year}-${String(this.month).padStart(2, '0')}`
	}
}

export class WtfDateRage {
	start?: WtfDate
	end?: WtfDate
	constructor(start?: WtfDate, end?: WtfDate) {
		this.start = start
		this.end = end
	}
}