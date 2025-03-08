import { type Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/']
}

export default config
