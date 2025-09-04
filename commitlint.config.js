module.exports = {
  extends: ['@commitlint/config-conventional'],
  /**
   * 허용 타입: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
   * 금지: 제목 Pascal/UPPER CASE, 제목 100자 초과, 본문 라인 200자 초과 등
   */
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
