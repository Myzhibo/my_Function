
type TFileStatus = 'init' | 'ing' | 'success' | 'fail' | 'error' | 'warning';


files: { file?: File; id?: string; progress: number; status?: TFileStatus; md5: string }[] = [];

selectFiles () {
  selectFile({ multiple: true }, async (files) => {
    if (files.some((file) => !/^((?!\\|\/|:|\*|\?|"|<|>|\||').)*$/g.test(file.name))) {
      this.$message.warning('存在非法字符\\ / : * ? " < > | \' ')
      return
    }
    files = files.filter((f) => {
      const list = this.files.filter((item) => item.file && item.file.name === f.name)
      if (list.length) {
        return false
      }
      return true
    })
    files.forEach((file) => {
      const item = {
        id: '',
        file: null,
        status: 'init',
        progress: 0
      } as any
      this.files.push(item)
      item.id = ''
      item.file = file
      item.status = 'init'
    })
  })
}