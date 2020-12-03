import { shallowMount, mount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Game.vue', () => {

  it('This should shuffle the array', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 }
    ]
    const wrapper = shallowMount(Game, {
      data() {
        return {
          cards,
          shuffledCards: []
        }
      }
    })

    wrapper.vm.setup()
    expect(wrapper.vm.shuffledCards[2].id).not.toBe(3)
  })

  it('This should increment the time', () => {
    const wrapper = shallowMount(Game, {
      data() {
        return {
          time: 5
        }
      }
    })
  
    wrapper.vm.increaseTime()
    expect(wrapper.vm.time).toBeGreaterThan(5)
  })

})

test('user submit string', async () => {
  const wrapper = mount(Game)

  const textInput = wrapper.find('input[type="text"]')
  await textInput.setValue('userName')

  expect(wrapper.find('input[type="text"]').element.value).toBe('userName')
})