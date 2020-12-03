import { shallowMount } from '@vue/test-utils';
import Modal from '@/components/AppModal.vue';

describe('Modal.vue', () => {

  it('renders the time string score in the modal', () => {
    const time = 5
    const score = time.toString();
    const wrapper = shallowMount(Modal, {
      propsData: { time }
    })
    expect(wrapper.text()).toMatch(score)
  })

})