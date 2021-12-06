import {KMP} from  '../../scripts/KMP.js'

describe('KMP.js', () => {
    it('finds single instance of test in the word test', () => {
      //Arrange
      const pattern = 'test'
      const text = 'test'

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(1)
    })
  })