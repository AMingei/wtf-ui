import { unref } from "vue"

type FormItemRule = {
	required?: boolean,
	range?: [number, number],
	pattern?: string,
	message?: string,
	custom?: (value: any) => boolean,
	listener: string | string[]
}

type FormItemRules = FormItemRule[]

type FormRule = Record<string, FormItemRules>

export type FormRules = Record<string, FormItemRules | FormRule>

type VerfifyRule = {
	path: string,
	rules: FormItemRule[]
}

export type VertifyInfo = VerfifyRule[]

export function contains(reference: Node, target: Node) {
	let targetNode = target
	while(!reference.contains(target)) {
		if(targetNode.parentNode) {
			targetNode = targetNode.parentNode
		} else {
			return false
		}
	}
	return true
}

export function toStyleObject(arg: string | object | undefined): object {
	return (typeof arg === 'string' ? 
		arg.split(';').reduce((acc, current) => {
			const keyValue = current.split(':')
			acc[keyValue[0].trim() as keyof typeof acc] = keyValue[1].trim()
			return acc
		}, { '': '' }) : arg) || {}
}

export function toClassList(arg: string | string[] | undefined): string[] {
	return (typeof arg === 'string' ? 
		arg.split(' ') : arg) || []
}

export function onClickOutside(domList: HTMLElement[], callback: Function) {
	function func() {
		document.addEventListener('click', (event) => {
			if(!domList.find((element) => element && element.contains ? element.contains(event.target as Node) : false)) {
				return callback()
			} else {
				func()
			}
		}, { once: true })
	}
	func()
}