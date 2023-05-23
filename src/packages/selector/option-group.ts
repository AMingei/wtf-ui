import { InjectionKey, Ref } from 'vue'

type OptionGroupContext = {
	isDisabled: Ref<boolean>
}

export const OPTIONGROUP_PROVIDE_KEY: InjectionKey<OptionGroupContext> = Symbol('WtfOptionGroup')