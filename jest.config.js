module.exports = {
  projects: ['<rootDir>/packages/**/jest.config.js'],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
}
