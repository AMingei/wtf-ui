import { ComputedRef, InjectionKey, Ref, WritableComputedRef, ref } from 'vue'

export type OptionValue = {
	value: Ref<any>,
	label: Ref<string>,
	checked: ComputedRef<boolean>
}

export type SelectorContext = {
	modelValue: WritableComputedRef<boolean | number | string | object | undefined>,
	optionList: Ref<OptionValue[]>
	keyword: Ref<string>,
	isFilterable: Ref<boolean>,
	hasTitle: Ref<boolean>,
	isMultiple: Ref<boolean>,
	showOptions: Function,
	hideOptions: Function,
	toggleOptions: Function
}

export const SELECTOR_PROVIDE_KEY: InjectionKey<SelectorContext> = Symbol('wtf-selector')