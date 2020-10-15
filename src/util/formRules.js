export const metaRule = {
  required: type => ({ type, required: true, message: '不能为空', trigger: 'blur，change' }),
  maxLength: maxLength => ({
    min: 0,
    max: maxLength,
    message: `长度不能超过${maxLength}个字符`,
    trigger: 'blur'
  }),
  range: (min, max) => ({
    min,
    max,
    type: 'number',
    message: `数值应在${min}到${max}之间`,
    trigger: 'blur',
    transform(value) {
      return Number(value)
    }
  }),
  ip: () => ({
    pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
    message: 'IP不合法',
    trigger: 'blur'
  })
}
