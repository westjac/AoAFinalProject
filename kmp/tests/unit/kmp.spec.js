import {KMP} from  '../../scripts/KMP.js'

describe('KMP.js', () => {
  it('finds no instances of the word test in a text lacking the word test', () => {
    //Arrange
    const pattern = 'test'
    const text = 'Welcome to a Jest!'

    //Act
    var matchLocations = KMP(pattern, text)
    
    //Assert
    expect(matchLocations.length).toBe(0)
  })

    it('finds single instance of test in the word test', () => {
      //Arrange
      const pattern = 'test'
      const text = 'test'

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(1)
    })

    it('finds four instances of test in the word testtesttesttest', () => {
      //Arrange
      const pattern = 'test'
      const text = 'testtesttesttest'

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(4)
    })

    it('finds two instances of test in random characters containing two instances of test', () => {
      //Arrange
      const pattern = 'test'
      const text = 'asdjk haltestkj oawernxasdm awdtestrlpkj amsdpoj'

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(2)
    })

    it('finds no instance of test on the text tes', () => {
      //Arrange
      const pattern = 'test'
      const text = 'tes'

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(0)
    })

    it('finds two instances of test on the text testest', () => {
      //Arrange
      const pattern = 'test'
      const text = 'testest'

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(2)
    })

    it('finds two instances of the word was in 8 sentances', () => {
      //Arrange
      const pattern = 'was'
      const text = "Please put on these earmuffs because I can't you hear. Writing a list of random sentences is harder than I initially thought it would be. Sarah ran from the serial killer holding a jug of milk. Henry couldn't decide if he was an auto mechanic or a priest. When she didn’t like a guy who was trying to pick her up, she started using sign language. We need to rent a room for our party. Sixty-Four comes asking for bread. Pat ordered a ghost pepper pie."

      //Act
      var matchLocations = KMP(pattern, text)
      
      //Assert
      expect(matchLocations.length).toBe(2)
    })
  })