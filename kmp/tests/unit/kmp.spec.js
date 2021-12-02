import * as KMP from  '../../scripts/KMP.js'

describe('KMP.js', () => {
    it('renders props.msg when passed', () => {
      const msg = 'new message'
      const wrapper = shallowMount(HelloWorld, {
        props: { msg }
      })
      expect(wrapper.text()).toMatch(msg)
    })
  })