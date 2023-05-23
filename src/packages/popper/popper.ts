import { Instance, Modifier, OptionsGeneric } from '@popperjs/core'
import { InjectionKey, Ref } from 'vue'

export const POPPER_PROVIDE_KEY: InjectionKey<TPopperContext> = Symbol('WtfPopper')

export type TPopperOption = Partial<OptionsGeneric<Partial<Modifier<any, any>>>> | undefined

export type TPopperContext = {
	triggerRef: Ref<Element>,
	contentRef: Ref<HTMLElement>,
	contentVisibility: Ref<boolean>,
	popperInstanceRef: Ref<Instance>,
	popperOptionsRef: Ref<TPopperOption>,
	triggerMode: Ref<TPopperTriggerMode>,
	triggerWithDelay: Function,
	showDelay: Ref<number>,
	hideDelay: Ref<number>,
	autoHideDelay: Ref<number>
}

type TBasePopperTriggerMode = 'hover' | 'click' | 'focus' | 'contextmenu' | 'always' | 'none'
export type TPopperTriggerMode = TBasePopperTriggerMode | TBasePopperTriggerMode[]