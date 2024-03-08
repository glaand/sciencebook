import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import Toast from '../components/toast.vue'

describe('Toast', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(Toast)
        expect(wrapper.vm).toBeTruthy()
    })

    it('should render toast', async () => {
        vi.mock('~/composables/toast', async () => {
            return {
                default: () => {
                    return {
                        showToast: true
                    }
                }
            }
        });
        const wrapper = mount(Toast)
        expect(wrapper.find('.toast').exists()).toBe(true)
    })

    it('should contain message', async () => {
        vi.mock('~/composables/toast', async () => {
            return {
                default: () => {
                    return {
                        showToast: true,
                        message: 'Hello'
                    }
                }
            }
        });
        const wrapper = mount(Toast)
        expect(wrapper.find('.toast span').text()).toBe('Hello')
    })

    it('should have certain alert-type', async () => {
        vi.mock('~/composables/toast', async () => {
            return {
                default: () => {
                    return {
                        showToast: true,
                        message: 'Hello',
                        type: 'success'
                    }
                }
            }
        });
        const wrapper = mount(Toast)
        expect(wrapper.find('.alert-success').exists()).toBe(true)
    })
})