import { shallowMount, mount } from '@vue/test-utils';
import Game from '@/views/Game.vue';

describe('Game.vue', () => {

  it('Should start the game when card is touched', () => {
    const wrapper = shallowMount(Game, {
      data() {
        return {
          time: 100,
          matchs: 213312,
          game: {
            hasStarted: true
          },
          restartCountdown: 0
        }
      }
    })
  
    wrapper.vm.restart()
    expect(wrapper.vm.time).toBe(0)
    expect(wrapper.vm.matchs).toBe(0)
    expect(wrapper.vm.game.hasStarted).toBeFalsy()
    expect(wrapper.vm.restartCountdown).toBe(10)
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