import { Instance, createPopper } from '@popperjs/core'
import { nextTick, ref, unref } from 'vue'

const popperInstanceList:{ instance: Instance, id: number, popper: HTMLElement }[] = []
const nextPopperId = ref(0)

export const vTitle = {
	mounted(el: HTMLElement, binding: any) {
		
		if(!binding.value) {
			return
		}

		const triggerDom = el

		if(!document.querySelector('.wtf-popper-container')) {
			const dom = document.createElement('div')
			dom.classList.add('wtf-popper-container')
			document.body.appendChild(dom)
		}
		
		const container = document.querySelector('.wtf-popper-container')!
		const contentDom = document.createElement('div')
		const dom = document.createElement('div')
		if(binding.modifiers.raw) {
			dom.innerHTML = binding.value
		} else {
			dom.innerText = binding.value
		}
		dom.classList.add('wtf-tooltip-content', 'wtf-tooltip-content--directive')
		contentDom.appendChild(dom)
		container.appendChild(contentDom)

		const popperInstance = createPopper(triggerDom, contentDom, {
			placement: binding.arg || 'top',
			modifiers: [{
				name: 'offset',
					options: {
					offset: [0, .5 * parseFloat(window.getComputedStyle(document.body).fontSize)]
				}
			}]
		})

		el.dataset.popperId = unref(nextPopperId).toString()
		popperInstanceList.push({ instance: popperInstance, popper: dom, id: unref(nextPopperId) })
		nextPopperId.value++

		contentDom.style.display = 'none'

		if(binding.modifiers.always) {
			contentDom.style.display = 'block'
			dom.classList.add('wtf-tooltip-content--directive-active')
		} else {
			triggerDom.addEventListener('mouseenter', () => {
				contentDom.style.display = 'block'
				nextTick(() => {
					dom.classList.add('wtf-tooltip-content--directive-active')
					popperInstance.update()
				})
			})
			triggerDom.addEventListener('mouseleave', () => {
				dom.classList.remove('wtf-tooltip-content--directive-active')
				setTimeout(() => {
					contentDom.style.display = 'none'
				}, 200)
			})
		}
	},
	updated(el: HTMLElement, binding: any) {
		const temp = popperInstanceList.find((item) => item.id === Number(el.dataset.popperId))
		if(temp) {
			const { instance: popperInstance, popper: popperDom } = temp
			if(binding.modifiers.raw) {
				popperDom.innerHTML = binding.value
			} else {
				popperDom.innerText = binding.value
			}
			popperInstance.update()
		}
	}
}