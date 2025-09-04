module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ New features
        'fix', // 🐛 Bug fixes
        'docs', // 📚 Documentation changes
        'style', // 💄 Code formatting, missing semicolons etc
        'refactor', // ♻️ Code refactoring
        'test', // 🧪 Adding/modifying tests
        'chore', // 🔧 Build tasks, package manager etc
        'perf', // ⚡ Performance improvements
        'ci', // 👷 CI/CD related changes
        'build', // 🏗️ Build system related changes
        'revert', // ⏪ Revert previous commits
      ],
    ],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200],
  },
}
